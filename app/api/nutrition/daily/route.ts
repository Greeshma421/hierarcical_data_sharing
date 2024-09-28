import { NextResponse } from 'next/server';
import { createSupabaseBrowser } from '@/lib/supabase/client';

const supabase = createSupabaseBrowser();

export async function POST(request: Request) {
  const { user_id, date, total_calories } = await request.json();

  const { data, error } = await supabase
    .from('daily_nutrition')
    .upsert({ user_id, date, total_calories }, { onConflict: 'user_id,date' })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data[0]);  // Return the first (and only) item in the array
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const date = searchParams.get('date');


  if (!user_id || !date) {
    return NextResponse.json({ error: 'Missing user_id or date' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('daily_nutrition')
    .select('*, consumed_foods(*)')
    .eq('user_id', user_id)
    .eq('date', date)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}