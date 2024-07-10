// app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';

const fetchUsersData = async (page: number, limit: number) => {
  const response = await fetch(`https://tech-exercise.vercel.app/api/user?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data from API.');
  }
  const data = await response.json();
  return data;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const data = await fetchUsersData(page, limit);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}