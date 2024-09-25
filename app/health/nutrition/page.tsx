"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock function to simulate API call for food data
const fetchFoodData = async (query: string) => {
  // In a real application, replace this with an actual API call
  // For example, you could use the Edamam Food Database API or Nutritionix API
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  return [
    { name: "Apple", calories: 95, image: "https://example.com/apple.jpg" },
    { name: "Banana", calories: 105, image: "https://example.com/banana.jpg" },
    { name: "Chicken Breast", calories: 165, image: "https://example.com/chicken.jpg" },
  ].filter(food => food.name.toLowerCase().includes(query.toLowerCase()))
}

export default function NutritionTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [trackedFoods, setTrackedFoods] = useState<any[]>([])

  const handleSearch = async () => {
    const results = await fetchFoodData(searchQuery)
    setSearchResults(results)
  }

  const addFood = (food: any) => {
    setTrackedFoods([...trackedFoods, food])
  }

  const totalCalories = trackedFoods.reduce((sum, food) => sum + food.calories, 0)
  const calorieGoal = 2000 // Example goal

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nutrition Tracker</h1>
      
      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search for a food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.map((food, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={food.image} alt={food.name} />
                    <AvatarFallback>{food.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.calories} calories</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => addFood(food)}>Add</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Tracked Foods</CardTitle>
          </CardHeader>
          <CardContent>
            {trackedFoods.map((food, index) => (
              <div key={index} className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={food.image} alt={food.name} />
                  <AvatarFallback>{food.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-500">{food.calories} calories</p>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <p className="font-medium mb-2">Total Calories: {totalCalories} / {calorieGoal}</p>
              <Progress value={(totalCalories / calorieGoal) * 100} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}