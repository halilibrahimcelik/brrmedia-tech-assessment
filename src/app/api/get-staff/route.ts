import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { delayMS } from '@/utils';

const staffDataPath = path.join(process.cwd(), 'public', 'data', 'staff.json');

export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    await delayMS(1000); // Simulate delay
    const staffData = await fs.readFile(staffDataPath, 'utf-8');
    if (!staffData) {
      return NextResponse.json(
        { error: 'Staff data not found' },
        { status: 404 }
      );
    }
    const parsedData = JSON.parse(staffData);
    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error('Error fetching staff data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
