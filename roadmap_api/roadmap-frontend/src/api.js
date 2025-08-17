// API utility for fetching roadmap data

export async function fetchRoadmaps() {
  const response = await fetch('http://localhost:8000/api/roadmap/');
  if (!response.ok) {
    throw new Error('Failed to fetch roadmaps');
  }
  return response.json();
} 