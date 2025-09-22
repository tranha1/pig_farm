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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface ApiResponse<T> {
  data: T[] | T;
  message?: string;
}

export interface ApiParams {
  skip?: number;
  limit?: number;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    params?: ApiParams
  ): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url.toString(), config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('admin_token');
          window.location.href = '/admin';
          throw new Error('Authentication required');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return await response.json();
  }

  // Medicines
  async getMedicines(params?: ApiParams): Promise<Medicine[]> {
    return this.request<Medicine[]>('/medicines', {}, params);
  }

  async getMedicine(id: number): Promise<Medicine> {
    return this.request<Medicine>(`/medicines/${id}`);
  }

  async createMedicine(medicine: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>): Promise<Medicine> {
    return this.request<Medicine>('/medicines', {
      method: 'POST',
      body: JSON.stringify(medicine),
    });
  }

  async updateMedicine(id: number, medicine: Partial<Medicine>): Promise<Medicine> {
    return this.request<Medicine>(`/medicines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(medicine),
    });
  }

  async deleteMedicine(id: number): Promise<void> {
    await this.request(`/medicines/${id}`, {
      method: 'DELETE',
    });
  }

  // Pigs
  async getPigs(params?: ApiParams): Promise<Pig[]> {
    return this.request<Pig[]>('/pigs', {}, params);
  }

  async getPig(id: number): Promise<Pig> {
    return this.request<Pig>(`/pigs/${id}`);
  }

  async createPig(pig: Omit<Pig, 'id' | 'created_at' | 'updated_at'>): Promise<Pig> {
    return this.request<Pig>('/pigs', {
      method: 'POST',
      body: JSON.stringify(pig),
    });
  }

  async updatePig(id: number, pig: Partial<Pig>): Promise<Pig> {
    return this.request<Pig>(`/pigs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pig),
    });
  }

  async deletePig(id: number): Promise<void> {
    await this.request(`/pigs/${id}`, {
      method: 'DELETE',
    });
  }

  // CMS
  async getNewsArticles(params?: ApiParams): Promise<NewsArticle[]> {
    return this.request<NewsArticle[]>('/cms', {}, params);
  }

  async getNewsArticle(id: number): Promise<NewsArticle> {
    return this.request<NewsArticle>(`/cms/${id}`);
  }

  async createNewsArticle(article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticle> {
    return this.request<NewsArticle>('/cms', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }

  async updateNewsArticle(id: number, article: Partial<NewsArticle>): Promise<NewsArticle> {
    return this.request<NewsArticle>(`/cms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  }

  async deleteNewsArticle(id: number): Promise<void> {
    await this.request(`/cms/${id}`, {
      method: 'DELETE',
    });
  }

  async getImage(imageId: number): Promise<ImageInfo> {
    return this.request<ImageInfo>(`/images/${imageId}`);
  }

  async healthCheck(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/`);
    return { message: 'API is running' };
  }
}

export interface ImageInfo {
  id: number;
  filename: string;
  url: string;
  width?: number;
  height?: number;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

export const apiService = new ApiService();