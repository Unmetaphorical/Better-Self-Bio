// src/types.ts

// This interface defines the structure of the data we will save to our JSON file.
// It ensures that both the API and the Frontend agree on what "Status" looks like.
export interface HealthData {
  mentalHealthScore: number; 
  currentMoodValue: number;
  dysphoriaEuphoriaRatio: number; 
  socialBattery: number;
  energyValue: number;
  lastUpdated: string;
}

// A simple response type for our API to ensure consistency
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: HealthData;
}