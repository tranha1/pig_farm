const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface Medicine {
  id: number;
  name: string;
  packaging?: string;
  price_unit?: number;
  price_total?: number;
  is_published: boolean;
  published_at?: string;
  updated_at?: string;
}

export interface Pig {
  id: number;
  name: string;
  price?: number;
  is_published: boolean;
  published_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
    page_size: number;
    has_next: boolean;
    has_previous: boolean;
  };
  message?: string;
}

export interface ApiParams {
  page?: number;
  page_size?: number;
  search?: string;
  published?: boolean;
}

class ApiService {
  private async request<T>(endpoint: string, params?: ApiParams): Promise<ApiResponse<T>> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getMedicines(params?: ApiParams): Promise<ApiResponse<Medicine>> {
    return this.request<Medicine>('/medicines/', params);
  }

  async getPigs(params?: ApiParams): Promise<ApiResponse<Pig>> {
    return this.request<Pig>('/pigs/', params);
  }

  async healthCheck(): Promise<{ status: string; service: string; version: string }> {
    const response = await fetch(`${API_BASE_URL}/health/`);
    return response.json();
  }
}

export const apiService = new ApiService();