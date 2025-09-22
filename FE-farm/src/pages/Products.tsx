import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePublicMedicines, usePublicPigs, useImage } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Eye, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

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
        alt="Product image"
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

const Products = () => {
    // Pagination state
    const [medicinesPage, setMedicinesPage] = useState(1);
    const [pigsPage, setPigsPage] = useState(1);
    const itemsPerPage = 9; // 3x3 grid

    // Fetch data from API with pagination
    const { data: medicinesData, isLoading: medicinesLoading, error: medicinesError } = usePublicMedicines({ 
        published: true, 
        skip: (medicinesPage - 1) * itemsPerPage, 
        limit: itemsPerPage 
    });
    const { data: pigsData, isLoading: pigsLoading, error: pigsError } = usePublicPigs({ 
        published: true, 
        skip: (pigsPage - 1) * itemsPerPage, 
        limit: itemsPerPage 
    });

    // Get total counts for pagination (we'll need to fetch without pagination for totals)
    const { data: allMedicines } = usePublicMedicines({ published: true });
    const { data: allPigs } = usePublicPigs({ published: true });

    const totalMedicinesPages = Math.ceil((allMedicines?.length || 0) / itemsPerPage);
    const totalPigsPages = Math.ceil((allPigs?.length || 0) / itemsPerPage);

    const renderMedicines = () => {
        if (medicinesLoading) {
            return (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        }

        if (medicinesError) {
            return (
                <Alert>
                    <AlertDescription>
                        Không thể tải dữ liệu thuốc. Vui lòng thử lại sau.
                    </AlertDescription>
                </Alert>
            );
        }

        if (!medicinesData || medicinesData.length === 0) {
            return (
                <Alert>
                    <AlertDescription>
                        Hiện tại chưa có sản phẩm thuốc nào được công bố.
                    </AlertDescription>
                </Alert>
            );
        }

        return (
            <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicinesData.map((medicine) => (
                        <Card key={medicine.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl">{medicine.name}</CardTitle>
                                <Badge variant="outline">
                                    {medicine.is_published ? 'Có sẵn' : 'Hết hàng'}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Image */}
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    <ProductImage imageId={medicine.cover_image_id} />
                                </div>

                                {medicine.packaging && (
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">ĐÓNG GÓI</h4>
                                        <p className="text-sm text-muted-foreground">{medicine.packaging}</p>
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    {medicine.price_unit && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Giá đơn vị:</span>
                                            <span className="font-semibold">{formatCurrency(medicine.price_unit)}</span>
                                        </div>
                                    )}
                                    {medicine.price_total && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Giá tổng:</span>
                                            <span className="font-semibold">{formatCurrency(medicine.price_total)}</span>
                                        </div>
                                    )}
                                </div>

                                {medicine.updated_at && (
                                    <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground">
                                            Cập nhật: {new Date(medicine.updated_at).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-3">
                                    <Link to={`/products/medicine/${medicine.id}`}>
                                        <Button variant="outline" className="w-full" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <PaginationComponent 
                    currentPage={medicinesPage} 
                    totalPages={totalMedicinesPages} 
                    onPageChange={setMedicinesPage} 
                />
            </div>
        );
    };

    const renderDynamicPigs = () => {
        if (pigsLoading) {
            return (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-16 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        }

        if (pigsError || !pigsData || pigsData.length === 0) {
            return null; // Don't show error for pigs, just hide the section
        }

        return (
            <section className="mt-16">
                <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                    SẢN PHẨM LỢN HIỆN CÓ
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pigsData.map((pig) => (
                        <Card key={pig.id}>
                            <CardHeader>
                                <CardTitle className="text-xl">{pig.name}</CardTitle>
                                <Badge variant={pig.is_published ? "default" : "secondary"}>
                                    {pig.is_published ? 'Có sẵn' : 'Hết hàng'}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {pig.price && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Giá:</span>
                                        <span className="font-semibold text-lg">{formatCurrency(pig.price)}</span>
                                    </div>
                                )}
                                
                                {pig.updated_at && (
                                    <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground">
                                            Cập nhật: {new Date(pig.updated_at).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Sản phẩm Metafarm
                        </h1>
                        <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                            Cung cấp đầy đủ các dòng heo giống chất lượng cao từ các quốc gia có nền chăn nuôi phát triển 
                            như Đan Mạch, Pháp, Đài Loan cùng với thuốc thú y và thiết bị chăn nuôi hiện đại.
                        </p>
                    </div>
                </div>
            </section>

            <main className="py-16">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="breeding-pigs" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="breeding-pigs">Heo giống</TabsTrigger>
                            <TabsTrigger value="medicine">Thuốc thú y & Thiết bị</TabsTrigger>
                        </TabsList>

                    {/* Lợn giống Tab */}
                    <TabsContent value="breeding-pigs" className="space-y-16">
                        {/* Dynamic pigs from API */}
                        <section>
                            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                                SẢN PHẨM LỢN HIỆN CÓ
                            </h2>
                            {pigsLoading && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(3)].map((_, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <Skeleton className="h-6 w-3/4" />
                                            </CardHeader>
                                            <CardContent>
                                                <Skeleton className="h-16 w-full" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                            
                            {pigsError && (
                                <Alert>
                                    <AlertDescription>
                                        Không thể tải dữ liệu sản phẩm lợn. Vui lòng thử lại sau.
                                    </AlertDescription>
                                </Alert>
                            )}
                            
                            {!pigsLoading && !pigsError && (!pigsData || pigsData.length === 0) && (
                                <Alert>
                                    <AlertDescription>
                                        Hiện tại chưa có sản phẩm lợn nào được công bố.
                                    </AlertDescription>
                                </Alert>
                            )}
                            
                            {!pigsLoading && !pigsError && pigsData && pigsData.length > 0 && (
                                <div className="space-y-8">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {pigsData.map((pig) => (
                                            <Card key={pig.id} className="hover:shadow-lg transition-shadow">
                                                <CardHeader>
                                                    <CardTitle className="text-xl">{pig.name}</CardTitle>
                                                    <Badge variant={pig.is_published ? "default" : "secondary"}>
                                                        {pig.is_published ? 'Có sẵn' : 'Hết hàng'}
                                                    </Badge>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    {/* Image */}
                                                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                                        <ProductImage imageId={pig.cover_image_id} />
                                                    </div>

                                                    {pig.price && (
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-muted-foreground">Giá:</span>
                                                            <span className="font-semibold text-lg">{formatCurrency(pig.price)}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {pig.updated_at && (
                                                        <div className="pt-2 border-t">
                                                            <p className="text-xs text-muted-foreground">
                                                                Cập nhật: {new Date(pig.updated_at).toLocaleDateString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="pt-3">
                                                        <Link to={`/products/pig/${pig.id}`}>
                                                            <Button variant="outline" className="w-full" size="sm">
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                Xem chi tiết
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                    
                                    <PaginationComponent 
                                        currentPage={pigsPage} 
                                        totalPages={totalPigsPages} 
                                        onPageChange={setPigsPage} 
                                    />
                                </div>
                            )}
                        </section>
                    </TabsContent>

                    {/* Thuốc Tab */}
                    <TabsContent value="medicine">
                        <section>
                            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                                THUỐC VÀ VẮC XIN
                            </h2>
                            {renderMedicines()}
                        </section>
                    </TabsContent>
                </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Products;