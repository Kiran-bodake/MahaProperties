import { useState, useCallback, useRef, useEffect } from "react";
import { SuggestionItem } from "@/lib/mock-data";

interface UseAutocompleteOptions {
  category?: "all" | "locality" | "property" | "keyword";
  minChars?: number;
  debounceMs?: number;
}

export function useAutocomplete(options: UseAutocompleteOptions = {}) {
  const { category = "all", minChars = 1, debounceMs = 300 } = options;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minChars) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          category,
        });

        const response = await fetch(`/api/search/autocomplete?${params}`);
        const data = await response.json();

        if (data.success) {
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Autocomplete fetch error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [category, minChars]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setQuery(value);

      // Clear previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, debounceMs);
    },
    [fetchSuggestions, debounceMs]
  );

  const handleSelectSuggestion = useCallback((item: SuggestionItem) => {
    setQuery(item.name);
    setShowSuggestions(false);
    setSuggestions([]);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const handleCloseSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    query,
    suggestions,
    isLoading,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
    handleClear,
    handleCloseSuggestions,
    setQuery,
    setShowSuggestions,
  };
}
