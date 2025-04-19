import { Entertainer } from '../types/Entertainer';

// Base URL for API requests
export const API_URL = 'https://localhost:5000/api';

/**
 * Fetches the list of all entertainers from the backend.
 * Returns a promise that resolves to an array of Entertainer objects.
 */
export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(`${API_URL}/entertainment`);

    // If the request fails, throw an error to be caught below
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);
    throw error;
  }
};

/**
 * Fetches a single entertainer by their ID.
 * Returns a promise that resolves to a single Entertainer object.
 *
 * @param id - The ID of the entertainer to fetch
 */
export const fetchEntertainerById = async (
  id: string
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/entertainment/${id}`);

    // If the request fails, throw an error to be caught below
    if (!response.ok) {
      throw new Error(`Failed to fetch entertainer with ID ${id}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainer by ID:', error);
    throw error;
  }
};
