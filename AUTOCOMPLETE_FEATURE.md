# Autocomplete Feature Documentation

## Overview
This document describes the autocomplete feature implementation for the MahaProperties search bar. The feature provides intelligent suggestions for properties, localities, and property types as users type in the search box.

## Features Implemented

### 1. **Mock Data System** (`src/lib/mock-data.ts`)
- **Localities**: 16 predefined localities in Nashik
- **Properties**: 8 sample properties with prices and areas
- **Keywords**: 10 property type keywords
- All mock data is searchable and filterable

### 2. **API Endpoint** (`src/app/api/search/autocomplete/route.ts`)
- **Endpoint**: `GET /api/search/autocomplete`
- **Query Parameters**:
  - `q` (required): Search query string (minimum 1 character)
  - `category` (optional): Filter by 'all', 'locality', 'property', or 'keyword' (default: 'all')
- **Response**:
  ```json
  {
    "success": true,
    "query": "gangapur",
    "suggestions": [...],
    "total": 5
  }
  ```

### 3. **useAutocomplete Hook** (`src/hooks/useAutocomplete.ts`)
A custom React hook that handles all autocomplete logic:

```typescript
const {
  query,                    // Current search query
  suggestions,              // Array of suggestion items
  isLoading,                // Loading state while fetching
  showSuggestions,          // Whether to show dropdown
  handleInputChange,        // Handle input changes with debounce
  handleSelectSuggestion,   // Handle suggestion selection
  handleClear,              // Clear all suggestions
  handleCloseSuggestions,   // Close dropdown
  setShowSuggestions,       // Manually toggle suggestions
} = useAutocomplete({
  category: 'all',          // Filter by category
  minChars: 1,              // Minimum characters before searching
  debounceMs: 300           // Debounce delay in milliseconds
});
```

**Features**:
- Debounced search (default 300ms) to avoid excessive API calls
- Automatic suggestion loading/unloading
- Cleanup on component unmount
- Support for filtering by category

### 4. **AutocompleteDropdown Component** (`src/components/shared/AutocompleteDropdown.tsx`)
A reusable dropdown component that displays search suggestions:

```typescript
<AutocompleteDropdown
  suggestions={suggestions}
  isLoading={isLoading}
  isOpen={showSuggestions}
  query={searchQuery}
  onSelect={handleSelect}
  onClose={handleClose}
  maxHeight="400px"
  className="custom-class"
/>
```

**Features**:
- Shows category badges (Locality, Property, Type)
- Color-coded icons for different suggestion types
- Loading state with spinner
- "No results" message
- Property details in suggestions (price, area)
- Locality description
- Smooth selection and closing

### 5. **Component Integration**

#### HeroSection (`src/components/home/hero/HeroSection.tsx`)
- Integrated autocomplete in the main search box
- Dropdown positioned below search input
- 320px dropdown width
- Full integration with search flow

#### Navbar (`src/components/layout/navbar/Navbar.tsx`)
- Integrated autocomplete in scrolled state search bar
- Dropdown positioned below search input
- 300px minimum width dropdown
- Blur timeout to prevent flickering

## How to Use

### For End Users
1. Click on the search input in either the Hero section or navigation bar
2. Start typing any property type, locality, or keyword
3. Suggestions will appear automatically as you type
4. Click on any suggestion to select it
5. Or continue typing and hit search
6. Use the X button to clear your search

### For Developers

#### Adding Autocomplete to a New Component

```typescript
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { AutocompleteDropdown } from "@/components/shared/AutocompleteDropdown";

export function MySearchComponent() {
  const {
    query,
    suggestions,
    isLoading,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
    handleCloseSuggestions,
    setShowSuggestions,
  } = useAutocomplete({ category: "all", minChars: 1 });

  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search..."
      />
      
      <AutocompleteDropdown
        suggestions={suggestions}
        isLoading={isLoading}
        isOpen={showSuggestions}
        query={query}
        onSelect={handleSelectSuggestion}
        onClose={handleCloseSuggestions}
      />
    </div>
  );
}
```

## Mock Data Structure

### Locality Object
```typescript
{
  id: "1",
  name: "Gangapur Road",
  category: "locality",
  slug: "gangapur-road"
}
```

### Property Object
```typescript
{
  id: "p1",
  name: "Green Valley NA Plot - Gangapur Road",
  category: "property",
  price: "₹18L - ₹25L",
  area: "500-1500 sq.ft",
  slug: "green-valley-na-plot"
}
```

### Keyword Object
```typescript
{
  id: "k1",
  name: "NA Plots",
  category: "keyword",
  icon: "🏞️"
}
```

## Customization

### Modify Mock Data
Edit `src/lib/mock-data.ts` to add more suggestions:

```typescript
export const MOCK_PROPERTIES = [
  { 
    id: "p1", 
    name: "Your Property Name", 
    category: "property", 
    price: "₹XXL - ₹YYL", 
    area: "XXXX sq.ft", 
    slug: "property-slug" 
  },
  // ... more properties
];
```

### Change Debounce Delay
```typescript
const autocomplete = useAutocomplete({ 
  debounceMs: 500  // Change from default 300ms
});
```

### Filter by Category
```typescript
// Only show localities
const autocomplete = useAutocomplete({ 
  category: "locality"
});

// Only show properties
const autocomplete = useAutocomplete({ 
  category: "property"
});
```

### Customize Dropdown Styling
The `AutocompleteDropdown` component uses Tailwind CSS classes that can be customized via the `className` prop:

```typescript
<AutocompleteDropdown
  {...props}
  className="custom-shadow rounded-xl"
/>
```

## API Endpoint Details

### Example Requests

```bash
# Search all categories
curl "http://localhost:3000/api/search/autocomplete?q=gangapur"

# Search only localities
curl "http://localhost:3000/api/search/autocomplete?q=na&category=locality"

# Search only keywords
curl "http://localhost:3000/api/search/autocomplete?q=warehouse&category=keyword"
```

### Example Response
```json
{
  "success": true,
  "query": "gangapur",
  "suggestions": [
    {
      "id": "1",
      "name": "Gangapur Road",
      "category": "locality",
      "slug": "gangapur-road"
    }
  ],
  "total": 1
}
```

## Performance Considerations

1. **Debouncing**: API calls are debounced to 300ms to prevent excessive requests
2. **Result Limiting**: Maximum 10 suggestions returned per query
3. **Caching**: Consider implementing client-side caching for frequently searched terms
4. **Lazy Loading**: Suggestions only load when input has enough characters

## Future Enhancements

1. **Search Analytics**: Track what users search for most
2. **Personalized Suggestions**: Based on user history and preferences
3. **Recent Searches**: Show user's previous searches
4. **Advanced Filtering**: Multi-select filters with autocomplete
5. **Server-side Search**: Connect to real database instead of mock data
6. **Keyboard Navigation**: Arrow keys to navigate suggestions
7. **Search Synonyms**: Match "apartment" to "flat", etc.

## Troubleshooting

### Suggestions not showing?
- Check browser console for API errors
- Verify `/api/search/autocomplete` endpoint is accessible
- Ensure `minChars` setting matches your typing pattern
- Check that `showSuggestions` state is true

### Dropdown positioning issues?
- Ensure parent container has `position: relative`
- Adjust `maxHeight` prop if suggestions are cut off
- Check z-index conflicts with other overlays

### Slow performance?
- Increase `debounceMs` value
- Reduce mock data size
- Implement pagination for large suggestion lists

## Files Modified

1. **Created Files**:
   - `src/lib/mock-data.ts` - Mock data
   - `src/app/api/search/autocomplete/route.ts` - API endpoint
   - `src/hooks/useAutocomplete.ts` - Custom hook
   - `src/components/shared/AutocompleteDropdown.tsx` - Dropdown component

2. **Modified Files**:
   - `src/components/home/hero/HeroSection.tsx` - Added autocomplete
   - `src/components/layout/navbar/Navbar.tsx` - Added autocomplete
