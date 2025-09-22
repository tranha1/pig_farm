import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, Clock, Eye, User, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiService, NewsArticle, NewsCategory, NewsApiParams } from "@/services/api";

const PaginationComponent = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page as number)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [articlesPerPage] = useState(12);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all articles for client-side filtering and pagination
      const data = await apiService.getNewsArticles({
        limit: 1000, // Large limit to get all articles
        skip: 0,
        published: true
      });
      
      setAllArticles(data);
      setTotalArticles(data.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate articles
  useEffect(() => {
    let filtered = allArticles.filter(article => {
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
    });

    setFilteredArticles(filtered);
    
    // Reset to page 1 when filters change
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [allArticles, searchTerm, selectedCategory]);

  // Paginate filtered articles
  useEffect(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    setArticles(paginatedArticles);
  }, [filteredArticles, currentPage, articlesPerPage]);

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
      await Promise.all([
        fetchArticles(),
        fetchCategories()
      ]);
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

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
      <Link to={`/news/${article.slug}`} className="block">
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
          <Link to={`/news/${article.slug}`}>
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
              {filteredArticles.length === 0 ? "Không tìm thấy bài viết nào" : "Không có bài viết nào trên trang này"}
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setCurrentPage(1);
            }}>
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <>
            {/* All Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}

            {/* Results info */}
            <div className="text-center text-sm text-muted-foreground mt-4">
              Hiển thị {articles.length} / {filteredArticles.length} bài viết
              {filteredArticles.length !== totalArticles && ` (lọc từ ${totalArticles} bài viết)`}
            </div>
          </>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;