import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, ApiParams, Medicine, Pig, NewsArticle, LoginRequest } from '@/services/api';

export const useMedicines = (params?: ApiParams) => {
  const isAuthenticated = !!localStorage.getItem('admin_token');
  return useQuery({
    queryKey: ['medicines', params],
    queryFn: () => apiService.getMedicines(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
    enabled: isAuthenticated,
  });
};

export const usePigs = (params?: ApiParams) => {
  const isAuthenticated = !!localStorage.getItem('admin_token');
  return useQuery({
    queryKey: ['pigs', params],
    queryFn: () => apiService.getPigs(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export const useNewsArticles = (params?: ApiParams) => {
  const isAuthenticated = !!localStorage.getItem('admin_token');
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => apiService.getNewsArticles(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiService.healthCheck(),
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Authentication
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => apiService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('admin_token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

// Medicine mutations
export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (medicine: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>) => 
      apiService.createMedicine(medicine),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
};

export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, medicine }: { id: number; medicine: Partial<Medicine> }) => 
      apiService.updateMedicine(id, medicine),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
};

export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteMedicine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
};

// Pig mutations
export const useCreatePig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (pig: Omit<Pig, 'id' | 'created_at' | 'updated_at'>) => 
      apiService.createPig(pig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pigs'] });
    },
  });
};

export const useUpdatePig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, pig }: { id: number; pig: Partial<Pig> }) => 
      apiService.updatePig(id, pig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pigs'] });
    },
  });
};

export const useDeletePig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deletePig(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pigs'] });
    },
  });
};

// CMS mutations
export const useCreateNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => 
      apiService.createNewsArticle(article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useUpdateNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, article }: { id: number; article: Partial<NewsArticle> }) => 
      apiService.updateNewsArticle(id, article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useDeleteNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteNewsArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

// Image hook
export const useImage = (imageId: number | null) => {
  return useQuery({
    queryKey: ['image', imageId],
    queryFn: () => apiService.getImage(imageId!),
    enabled: !!imageId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};