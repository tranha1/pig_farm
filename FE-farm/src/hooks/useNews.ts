import { useState, useEffect } from 'react';
import { apiService, NewsArticle } from '@/services/api';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch articles
        const articlesResponse = await apiService.getNewsArticles({ 
          published: true,
          limit: 10,
          skip: 0
        });

        setArticles(articlesResponse);

      } catch (err) {
        console.error('Error fetching news data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, loading, error };
};