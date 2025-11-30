// src/app/api/status/route.ts

import { NextResponse } from 'next/server';
import { getStatusData, saveStatusData } from '@/lib/data';
import { HealthData } from '@/types';

/**
 * GET Handler
 * Provides the current status data from status.json.
 */
export async function GET() {
  const data = await getStatusData();
  
  // Disable caching so the client always gets the latest data
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

/**
 * POST Handler
 * Updates the status. Requires a successful authentication (currently bypassed).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Prepare the new data object (must use updated keys)
    const newData: HealthData = {
      mentalHealthScore: Number(body.mentalHealthScore),
      currentMoodValue: Number(body.currentMoodValue),
      socialBattery: Number(body.socialBattery),
      dysphoriaEuphoriaRatio: Number(body.dysphoriaEuphoriaRatio),
      energyValue: Number(body.energyValue),
      lastUpdated: new Date().toISOString(), // Auto-update the timestamp
    };
    
    // Save to the JSON file
    await saveStatusData(newData);

    return NextResponse.json({ success: true, data: newData });

  } catch (error) {
    console.error("Server side error during POST:", error);
    // If the error persists here, it is likely a file permission issue (Scenario B).
    return NextResponse.json({ success: false, message: 'Server Side Error During Update (Check File Permissions)' }, { status: 500 });
  }
}