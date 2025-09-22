import { useState, useEffect } from 'react';
import { apiService, NewsArticle } from '@/services/api';

export const useNewsDetail = (articleId: number | string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getNewsArticle(Number(articleId));
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  return { article, loading, error };
};

export const useNewsDetailBySlug = (slug: string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleBySlug = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get all articles and find by slug
        // This is a workaround since we don't have a direct slug endpoint
        const data = await apiService.getNewsArticles({
          limit: 100,
          skip: 0
        });
        
        const foundArticle = data.find(article => article.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article by slug:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleBySlug();
    }
  }, [slug]);

  return { article, loading, error };
};