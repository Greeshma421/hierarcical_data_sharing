import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info, Trash2 } from "lucide-react"
import { NutrientBadge } from "./NutrientBadge"
import { Food } from "../types"
import Image from "next/image"

interface TrackedFoodsListProps {
  foods: Food[]
  onDeleteFood: (foodId: string) => void
}

export function TrackedFoodsList({ foods, onDeleteFood }: TrackedFoodsListProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Today's Tracked Foods</h2>
      {foods.map((food) => (
        <div key={food.id} className="flex items-center justify-between mb-4 p-2 hover:bg-gray-100 rounded-md">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={food.image_url} alt={food.food_name} />
              <AvatarFallback>{food.food_name ? food.food_name[0] : 'F'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{food.food_name}</p>
              <p className="text-xs text-gray-500">{food.calories} calories</p>
            </div>
          </div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{food.food_name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <Image src={food.image_url} alt={food.food_name} className="w-full object-cover rounded-md" width={100} height={100} />
                  <h3 className="text-xl font-semibold">Nutritional Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <NutrientBadge label="Calories" value={food.calories} unit="kcal" color="bg-red-100 text-red-800" />
                    <NutrientBadge label="Protein" value={food.protein} unit="g" color="bg-blue-100 text-blue-800" />
                    <NutrientBadge label="Carbs" value={food.carbs} unit="g" color="bg-green-100 text-green-800" />
                    <NutrientBadge label="Fat" value={food.fat} unit="g" color="bg-yellow-100 text-yellow-800" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" onClick={() => onDeleteFood(food.id)} className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}