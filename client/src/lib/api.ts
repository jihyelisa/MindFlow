import { User, SajuReading, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(public statusCode: number, message: string, public details?: string[]) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || 'An error occurred',
        data.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error occurred');
  }
}

// User API
export const userApi = {
  create: async (userData: {
    name: string;
    birthDate: string;
    birthTime?: string;
    gender?: string;
  }): Promise<User> => {
    const response = await fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response.data!;
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetchApi<User>(`/users/${id}`);
    return response.data!;
  },

  update: async (
    id: string,
    userData: Partial<{
      name: string;
      birthDate: string;
      birthTime: string;
      gender: string;
    }>
  ): Promise<User> => {
    const response = await fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.data!;
  },
};

// Saju API
export const sajuApi = {
  createReading: async (readingData: {
    userId: string;
    type: 'today' | 'month' | 'life';
    content: {
      fortuneLevel: string;
      fortuneDescription: string;
      advice: string;
      luckyColor?: string;
      luckyNumber?: number;
      warning?: string;
    };
  }): Promise<SajuReading> => {
    const response = await fetchApi<SajuReading>('/saju/readings', {
      method: 'POST',
      body: JSON.stringify(readingData),
    });
    return response.data!;
  },

  getReading: async (userId: string, type: 'today' | 'month' | 'life'): Promise<SajuReading> => {
    const response = await fetchApi<SajuReading>(`/saju/readings/${userId}/${type}`);
    return response.data!;
  },

  getAllReadings: async (userId: string): Promise<SajuReading[]> => {
    const response = await fetchApi<SajuReading[]>(`/saju/readings/${userId}`);
    return response.data!;
  },
};

export { ApiError };
