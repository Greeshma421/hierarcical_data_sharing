import { useState, useEffect } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface FoodSearchProps {
  onAddFood: (foodName: string) => void
}

export function FoodSearch({ onAddFood }: FoodSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchAutocomplete(searchQuery)
      } else {
        setAutocompleteResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const fetchAutocomplete = async (query: string) => {
    try {
      const response = await fetch('/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, type: 'instant' }),
      });
      const data = await response.json();
      setAutocompleteResults(data.common?.slice(0, 10) || []);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Search for a food..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>Start typing to search for foods...</CommandEmpty>
        <CommandGroup heading="">
          {autocompleteResults.map((result, index) => (
            <CommandItem
              key={index}
              value={result.food_name}
              onSelect={() => setSearchQuery(result.food_name)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{result.food_name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddFood(result.food_name);
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}