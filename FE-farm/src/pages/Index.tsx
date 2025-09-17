import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import NewsCarousel from "@/components/NewsCarousel";
import { useNews } from "@/hooks/useNews";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Users, MapPin, Calendar, ArrowRight, Newspaper } from "lucide-react";

const Index = () => {
  const { articles, categories, loading, error } = useNews();
  
  const businessAreas = [
    {
      title: "Chăn nuôi & nhập khẩu heo giống",
      description: "Nhập khẩu, phân phối heo giống GGP, GP, PS từ các nước có nền chăn nuôi phát triển như Đan Mạch, Pháp, Đài Loan",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Sản xuất thuốc thú y & thiết bị",
      description: "Sản xuất, phân phối thuốc thú y và thiết bị chăn nuôi chất lượng cao",
      icon: <CheckCircle className="h-6 w-6 text-primary" />
    }
  ];

  const partners = [
    // Đối tác trong nước
    { name: "ANT", type: "domestic" },
    { name: "Deheus", type: "domestic" },
    { name: "Hanofeed", type: "domestic" },
    // Đối tác quốc tế
    { name: "Axiom (Pháp)", type: "international" },
    { name: "Cooperl (Pháp)", type: "international" },
    { name: "Danish Genetics (Đan Mạch)", type: "international" }
  ];

  const achievements = [
    {
      title: "Tăng trưởng ấn tượng",
      description: "Đạt mức tăng trưởng 400% trong giai đoạn từ 2021 đến 2024",
      icon: <TrendingUp className="h-6 w-6 text-accent" />
    },
    {
      title: "Hệ thống phân phối rộng khắp", 
      description: "Có hệ thống khách hàng trải dài khắp 63 tỉnh thành tại Việt Nam",
      icon: <MapPin className="h-6 w-6 text-accent" />
    },
    {
      title: "Quy mô cung cấp lớn",
      description: "Cung cấp heo giống cho hàng nghìn đơn vị trung tâm giống và các trang trại chăn nuôi lớn nhỏ",
      icon: <Users className="h-6 w-6 text-accent" />
    }
  ];

  const facilities = [
    {
      title: "Trại hạt nhân Duroc Đài Loan",
      description: "Hợp tác xã Metafarm tại xã Việt Hoà, huyện Khoái Châu, tỉnh Hưng Yên"
    },
    {
      title: "Hệ thống trại GGP, GP, PS",
      description: "Bao gồm trại từ Axiom, Cooperl (Pháp) và Danish Genetics (Đan Mạch)"
    },
    {
      title: "Trại xuất bán heo giống",
      description: "Trại Metavet tại xã Ba Trại, huyện Ba Vì, Hà Nội"
    },
    {
      title: "Văn phòng chính",
      description: "4 ngách 10/461 Ng. 461 Đ. Nguyễn Văn Linh, Sài Đồng, Long Biên, Hà Nội"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* Product Introduction Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                SẢN PHẨM LỢN GIỐNG
              </h2>
              <p className="text-xl text-accent font-semibold">
                Chất lượng cao, năng suất vượt trội
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                <Card className="border border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="text-primary font-bold text-2xl">☞</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Chúng tôi chuyên cung cấp heo dực nhân giống
                      </p>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="text-primary font-bold text-2xl">☞</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Hậu bị nái thuần chủng, ngoại hình đẹp, năng suất chất lượng cao
                      </p>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="text-primary font-bold text-2xl">☞</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Hậu bị 2 máu cao sản, nhập khẩu, năng suất sinh sản vượt trội
                      </p>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="text-primary font-bold text-2xl">☞</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Đội ngũ kỹ thuật chuyên nghiệp, chăm sóc khách hàng nhiệt huyết, tận tâm, tận tình
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary font-bold text-2xl">☞</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Chúng tôi phát triển bằng sự tín nhiệm, tin cậy của khách hàng
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section - Giới thiệu về Metafarm */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-8">
                GIỚI THIỆU VỀ CHÚNG TÔI
              </h2>
            </div>

            {/* Main Company Introduction */}
            <div className="mb-16">
              <div className="max-w-5xl mx-auto">
                <Card className="border border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Công ty có ngành nghề kinh doanh chính là Chăn nuôi heo, nhập khẩu, phân phối heo giống GGP, GP, PS từ các nước có nền chăn nuôi phát triển như Đan Mạch, Pháp, Đài Loan...
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Sản xuất, phân phối thuốc thú y, thiết bị chăn nuôi.
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Nhiều đơn vị lớn tại Việt Nam tin cậy sản phẩm lợn giống: ANT, Deheus, Hanofeed...
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Là Công ty trẻ nhưng Metafarm với bộ máy nhân sự có kinh nghiệm, tầm nhìn và kế hoạch rõ ràng để hướng đến những giá trị cốt lõi thiết thực.
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Qua đó, chúng tôi cam kết đem đến cho Quý khách hàng những con giống chất lượng nhất, đảm bảo về độ an toàn.
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-primary font-bold text-xl mt-1">•</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Với những đối tác chất lượng đến từ Đan Mạch, Pháp mang đến cho khách hàng những heo giống, uy tín chất lượng.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Business Areas */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Lĩnh vực kinh doanh chính
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {businessAreas.map((area, index) => (
                  <Card key={index} className="border border-border shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {area.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {area.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Partners Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Đối tác và khách hàng lớn
              </h3>
              <p className="text-muted-foreground mb-8 text-center">
                Sản phẩm heo giống của Metafarm được nhiều đơn vị lớn tại Việt Nam tin dùng và có các đối tác uy tín quốc tế
              </p>
              
              {/* Đối tác trong nước */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Khách hàng tin cậy tại Việt Nam
                </h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  {partners.filter(p => p.type === "domestic").map((partner, index) => (
                    <Badge key={index} variant="secondary" className="text-lg px-6 py-2">
                      {partner.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Đối tác quốc tế */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Đối tác uy tín từ Đan Mạch và Pháp
                </h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  {partners.filter(p => p.type === "international").map((partner, index) => (
                    <Badge key={index} variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
                      {partner.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="mb-16">
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Cam kết của chúng tôi
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Chúng tôi cam kết đem đến cho Quý khách hàng những con giống chất lượng nhất,
                    đảm bảo về độ an toàn.
                  </p>
                  <p className="text-muted-foreground">
                    Với những đối tác chất lượng đến từ Đan Mạch, Pháp mang đến cho khách hàng
                    những heo giống uy tín, chất lượng cao.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                THÀNH TỰU
              </h3>
              
              {/* Original achievements cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="border border-border shadow-soft hover:shadow-strong transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {achievement.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional detailed achievements */}
              <div className="max-w-4xl mx-auto">
                <Card className="border border-accent/20 shadow-lg bg-gradient-to-r from-accent/5 to-primary/5">
                  <CardContent className="p-8">
                    <h4 className="text-2xl font-bold text-foreground mb-6 text-center">
                      Chi tiết thành tựu đạt được
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <span className="text-accent font-bold text-xl mt-1">✓</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Hệ thống khách hàng 63 tỉnh thành Việt Nam
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-accent font-bold text-xl mt-1">✓</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Tăng trưởng 400% trong ba năm 2021-2024
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-accent font-bold text-xl mt-1">✓</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Cung cấp cho hàng nghìn đơn vị trung tâm giống và các trang trại chăn nuôi lớn nhỏ
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-accent font-bold text-xl mt-1">✓</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Trại hạt nhân Duroc Đài Loan
                        </p>
                      </div>
                      <div className="flex items-start space-x-4">
                        <span className="text-accent font-bold text-xl mt-1">✓</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Hệ thống trại GGP, GP, PS: Axiom, Cooperl, Danish Genetics
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Facilities */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Hệ thống cơ sở
              </h3>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {facilities.map((facility, index) => (
                  <Card key={index} className="border border-border shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {facility.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {facility.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* News Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Newspaper className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">
                    Tin tức mới nhất
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Cập nhật những thông tin mới nhất về ngành chăn nuôi, công nghệ và hoạt động của Metafarm
                </p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">Đang tải tin tức...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">Không thể tải tin tức: {error}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                  >
                    Thử lại
                  </Button>
                </div>
              ) : articles.length > 0 ? (
                <>
                  <NewsCarousel articles={articles} categories={categories} />
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg" className="group">
                      Xem tất cả tin tức
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có tin tức nào được đăng</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <Products />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;