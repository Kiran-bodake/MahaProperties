import React from "react";
import Link from "next/link";
import { SuggestionItem } from "@/lib/mock-data";
import { Search, Loader2, MapPin, Home, Tag } from "lucide-react";

interface AutocompleteDropdownProps {
  suggestions: SuggestionItem[];
  isLoading: boolean;
  isOpen: boolean;
  query: string;
  onSelect: (item: SuggestionItem) => void;
  onClose: () => void;
  maxHeight?: string;
  className?: string;
}

export const AutocompleteDropdown = React.forwardRef<
  HTMLDivElement,
  AutocompleteDropdownProps
>(
  (
    {
      suggestions,
      isLoading,
      isOpen,
      query,
      onSelect,
      onClose,
      maxHeight = "400px",
      className = "",
    },
    ref
  ) => {
    if (!isOpen) return null;

    const getIcon = (item: SuggestionItem) => {
      if (item.category === "locality") {
        return <MapPin size={16} className="text-green-600" />;
      } else if (item.category === "property") {
        return <Home size={16} className="text-blue-600" />;
      } else if (item.category === "keyword") {
        return <Tag size={16} className="text-orange-600" />;
      }
      return null;
    };

    const getCategoryBadge = (category: string) => {
      const badges: Record<string, { bg: string; text: string; label: string }> = {
        locality: { bg: "bg-green-50", text: "text-green-700", label: "Locality" },
        property: { bg: "bg-blue-50", text: "text-blue-700", label: "Property" },
        keyword: { bg: "bg-orange-50", text: "text-orange-700", label: "Type" },
      };
      return badges[category] || badges.keyword;
    };

    return (
      <div
        ref={ref}
        style={{
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
          maxHeight: maxHeight,
          overflow: "auto",
        }}
        className={className}
      >
        {isLoading && (
          <div className="flex items-center justify-center gap-2 p-4 text-gray-600">
            <Loader2 size={16} className="animate-spin" />
            <span>Searching...</span>
          </div>
        )}

        {!isLoading && suggestions.length === 0 && query.length > 0 && (
          <div className="p-4 text-center text-gray-500">
            <Search size={20} className="mx-auto mb-2 opacity-50" />
            <p>No results for "{query}"</p>
            <p className="text-xs mt-1">Try different keywords</p>
          </div>
        )}

        {!isLoading && suggestions.length > 0 && (
          <div className="py-1">
            {suggestions.map((item, idx) => {
              const badge = getCategoryBadge(item.category);
              const isProperty = item.category === "property";
              const isLocality = item.category === "locality";

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-0.5 flex-shrink-0">{getIcon(item)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-500 text-gray-900 truncate text-sm group-hover:text-green-600 transition-colors">
                          {item.name}
                        </div>
                        {isProperty && "price" in item && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {(item as any).price} • {(item as any).area}
                          </div>
                        )}
                        {isLocality && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            Explore this locality
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-md flex-shrink-0 ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

AutocompleteDropdown.displayName = "AutocompleteDropdown";
