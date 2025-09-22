const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface Medicine {
  id: number;
  name: string;
  category_id?: number;
  line_id?: number;
  ingredients?: string;
  indications?: string;
  packaging?: string;
  unit_id?: number;
  price_unit?: number;
  price_total?: number;
  dose_unit_id?: number;
  price_per_dose?: number;
  support_price_per_dose?: number;
  is_featured?: boolean;
  cover_image_id?: number;
  slug?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pig {
  id: number;
  pig_type_id?: number;
  name: string;
  breed_line_id?: number;
  unit_id?: number;
  price?: number;
  note?: string;
  is_featured?: boolean;
  cover_image_id?: number;
  slug?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: number;
  kind_id: number;
  slug: string;
  title: string;
  summary?: string;
  body_json?: any;
  body_html?: string;
  video_url?: string;
  external_url?: string;
  cover_image_id?: number;
  author_name?: string;
  seo_title?: string;
  seo_desc?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T[];
  message?: string;
}

export interface SingleApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiParams {
  skip?: number;
  limit?: number;
}

class ApiService {
  private async request<T>(endpoint: string, params?: ApiParams): Promise<T[]> {
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

  private async requestSingle<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getMedicines(params?: ApiParams): Promise<Medicine[]> {
    return this.request<Medicine>('/medicines', params);
  }

  async getPigs(params?: ApiParams): Promise<Pig[]> {
    return this.request<Pig>('/pigs', params);
  }

  async getPig(pigId: number): Promise<Pig> {
    return this.requestSingle<Pig>(`/pigs/${pigId}`);
  }

  async getMedicine(medicineId: number): Promise<Medicine> {
    return this.requestSingle<Medicine>(`/medicines/${medicineId}`);
  }

  async getNewsArticles(params?: ApiParams): Promise<NewsArticle[]> {
    return this.request<NewsArticle>('/cms', params);
  }

  async getNewsArticle(articleId: number): Promise<NewsArticle> {
    return this.requestSingle<NewsArticle>(`/cms/${articleId}`);
  }

  async healthCheck(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/`);
    return { message: 'API is running' };
  }
}

export const apiService = new ApiService();