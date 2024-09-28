import { NextResponse } from 'next/server';
import { createSupabaseBrowser } from '@/lib/supabase/client';

const supabase = createSupabaseBrowser();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'No ID provided for deletion' }, { status: 400 });
  }

  // First, get the food item to be deleted
  const { data: foodData, error: foodError } = await supabase
    .from('consumed_foods')
    .select('*')
    .eq('id', id)
    .single();

  if (foodError) {
    return NextResponse.json({ error: foodError.message }, { status: 400 });
  }

  if (!foodData) {
    return NextResponse.json({ error: 'Food not found' }, { status: 404 });
  }

  // Delete the food item
  const { error: deleteError } = await supabase
    .from('consumed_foods')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  // Update total calories in daily_nutrition
  const { error: updateError } = await supabase.rpc('update_daily_calories', {
    p_daily_nutrition_id: foodData.daily_nutrition_id,
    p_calories: -foodData.calories // Subtract the calories
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}