import { NextResponse } from 'next/server';
import { createSupabaseBrowser } from '@/lib/supabase/client';

const supabase = createSupabaseBrowser();

export async function POST(request: Request) {
  const { daily_nutrition_id, food_name, calories, protein, carbs, fat, image_url } = await request.json();
  
  if (!daily_nutrition_id) {
    return NextResponse.json({ error: 'daily_nutrition_id is required' }, { status: 400 });
  }


  const { data, error } = await supabase
    .from('consumed_foods')
    .insert({ daily_nutrition_id, food_name, calories, protein, carbs, fat, image_url })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Update total calories in daily_nutrition
  const { error: updateError } = await supabase.rpc('update_daily_calories', {
    p_daily_nutrition_id: daily_nutrition_id,
    p_calories: calories
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json(data);
}