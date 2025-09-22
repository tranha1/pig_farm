import { useParams, Link, useNavigate } from "react-router-dom";
import { useNewsDetailBySlug } from '@/hooks/useNewsDetail';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  User, 
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useImage } from "@/hooks/useApi";
import { NewsArticle } from "@/services/api";

const ProductImage = ({ imageId, className = "w-full h-full object-cover" }: { imageId: number | null, className?: string }) => {
  const { data: imageInfo } = useImage(imageId);

  if (!imageId) {
    return (
      <div className={`flex items-center justify-center text-gray-400 ${className}`}>
        <ImageIcon className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={imageInfo?.url ? `http://127.0.0.1:8000${imageInfo.url}` : ''}
        alt="News image"
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback') as HTMLElement;
          if (fallback) {
            fallback.classList.remove('hidden');
          }
        }}
        onLoad={(e) => {
          const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback') as HTMLElement;
          if (fallback) {
            fallback.classList.add('hidden');
          }
        }}
      />
      <div className="image-fallback absolute inset-0 flex items-center justify-center text-gray-400">
        <ImageIcon className="h-12 w-12" />
      </div>
    </div>
  );
};

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { article, loading, error } = useNewsDetailBySlug(slug || "");

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    if (!article) return;
    
    const url = window.location.href;
    const title = article.title;
    const text = article.summary || article.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Could add a toast notification here
        break;
    }
  };

  const LoadingSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-64 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <LoadingSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error || "Không tìm thấy bài viết"}
            </h1>
            <Button onClick={() => navigate("/news")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách tin tức
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-primary">Tin tức</Link>
            <span>/</span>
            <span className="text-foreground">{article.title}</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/news")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            
            {article.summary && (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {article.summary}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {article.author_name && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author_name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.id} ID</span>
              </div>
            </div>

            {/* Tags - Removed as not available in NewsArticle interface */}
            
            {/* Share Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium mr-2">Chia sẻ:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {article.cover_image_id && (
            <div className="mb-8">
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <ProductImage imageId={article.cover_image_id} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div 
              dangerouslySetInnerHTML={{ __html: article.body_html || '' }}
              className="text-foreground leading-relaxed"
            />
          </article>

          {/* Article Footer */}
          <footer className="border-t pt-8 mb-12">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  Chia sẻ bài viết này
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;