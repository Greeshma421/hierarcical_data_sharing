export async function fetchHealthData() {
  const response = await fetch('http://127.0.0.1:8001/api/health_data/1');
  if (!response.ok) {
    throw new Error('Failed to fetch health data');
  }
  return response.json();
}