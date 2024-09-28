import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query, type } = await request.json();
  
  const baseUrl = 'https://trackapi.nutritionix.com/v2';
  const endpoint = type === 'instant' ? '/search/instant' : '/natural/nutrients';
  const method = type === 'instant' ? 'GET' : 'POST';

  const url = new URL(`${baseUrl}${endpoint}`);
  if (type === 'instant') {
    url.searchParams.append('query', query);
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.NUTRITIONIX_APP_ID!,
      'x-app-key': process.env.NUTRITIONIX_API_KEY!,
    },
    body: type === 'instant' ? undefined : JSON.stringify({ query }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
