import fs from 'fs/promises';
import path from 'path';
import { HealthData } from '@/types';

// Define the path where the JSON file will be stored.
// process.cwd() gets the root folder of your project.
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'status.json');

// Default data to use if the file doesn't exist yet.
const defaultData: HealthData = {
  mentalHealthScore: 0,
  currentMoodValue: 0,
  dysphoriaEuphoriaRatio: 0,
  socialBattery: 0,
  energyValue: 0,
  lastUpdated: new Date().toISOString(),
};

/**
 * Reads the status data from the JSON file.
 * If the file doesn't exist, it creates it with default data.
 */
export async function getStatusData(): Promise<HealthData> {
  try {
    // Attempt to read the file
    const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist (ENOENT), write the default data
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

/**
 * Writes new status data to the JSON file.
 */
export async function saveStatusData(data: HealthData): Promise<void> {
  // Ensure the directory exists before writing
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}