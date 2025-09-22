import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Eye, User, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiService, NewsArticle, NewsCategory, NewsApiParams } from "@/services/api";

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchArticles = async (params?: NewsApiParams) => {
    try {
      const data = await apiService.getNewsArticles({
        limit: 12,
        skip: (currentPage - 1) * 12,
        ...params
      });

      if (params?.page === 1) {
        setArticles(data);
      } else {
        setArticles(prev => [...prev, ...data]);
      }
      
      // For now, assume single page since we don't have pagination
      setTotalPages(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const fetchCategories = async () => {
    // For now, we'll use hardcoded categories since CMS doesn't have categories
    setCategories([
      { id: 1, name: 'Liên hệ', slug: 'contact', description: '', color: '', icon: '', parent_id: null, sort_order: 1, is_published: true, published_at: '', created_at: '', updated_at: '' },
      { id: 2, name: 'Tin tức', slug: 'news', description: '', color: '', icon: '', parent_id: null, sort_order: 2, is_published: true, published_at: '', created_at: '', updated_at: '' },
      { id: 3, name: 'Quy trình', slug: 'process', description: '', color: '', icon: '', parent_id: null, sort_order: 3, is_published: true, published_at: '', created_at: '', updated_at: '' }
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCurrentPage(1);
      
      await Promise.all([
        fetchArticles({ page: 1 }),
        fetchCategories()
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, [searchTerm, selectedCategory, showFeaturedOnly]);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages || isLoadingMore) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    await fetchArticles({ page: nextPage });
    setIsLoadingMore(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return '';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || '';
  };

  const NewsCard = ({ article }: { article: NewsArticle }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/news/${article.id}`} className="block">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.kind_id === 1 ? 'Liên hệ' : article.kind_id === 2 ? 'Tin tức' : 'Quy trình'}
            </Badge>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.published_at)}
            </span>
          </div>
          
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          
          {article.summary && (
            <CardDescription className="line-clamp-3 mt-2">
              {article.summary}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-4">
              {article.author_name && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {article.author_name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      
      <CardContent className="pt-0">
        <Button className="w-full" variant="outline" asChild>
          <Link to={`/news/${article.id}`}>
            Đọc thêm
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="w-full h-48" />
          <CardHeader>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-16 w-full mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tin tức & Cập nhật
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Cập nhật những thông tin mới nhất về ngành chăn nuôi, công nghệ tiên tiến 
              và hoạt động của Metafarm. Chia sẻ kiến thức chuyên môn từ các chuyên gia hàng đầu.
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          
          <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant={showFeaturedOnly ? "default" : "outline"}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className="w-full md:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Nổi bật
          </Button>
        </div>

        {/* Content */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Lỗi: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Thử lại
            </Button>
          </div>
        ) : loading ? (
          <LoadingSkeleton />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Không tìm thấy bài viết nào
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setShowFeaturedOnly(false);
            }}>
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {articles.some(article => article.is_featured) && !searchTerm && selectedCategory === "all" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {articles
                    .filter(article => article.is_featured)
                    .slice(0, 2)
                    .map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles
                .filter(article => {
                  // Filter by search term
                  if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                      !article.summary?.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return false;
                  }
                  // Filter by category
                  if (selectedCategory && selectedCategory !== "all" && article.kind_id.toString() !== selectedCategory) {
                    return false;
                  }
                  return true;
                })
                .map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
            </div>

            {/* Load More */}
            {currentPage < totalPages && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  size="lg"
                >
                  {isLoadingMore ? "Đang tải..." : "Xem thêm bài viết"}
                </Button>
              </div>
            )}
          </>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;