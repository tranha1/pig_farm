import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import NewsCarousel from "@/components/NewsCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Users, MapPin, Calendar, ArrowRight, Newspaper } from "lucide-react";

const Index = () => {
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

  const partners = ["ANT", "Deheus", "Hanofeed"];

  const achievements = [
    {
      title: "Phủ sóng toàn quốc",
      description: "Hệ thống khách hàng 63 tỉnh thành Việt Nam",
      icon: <MapPin className="h-6 w-6 text-accent" />
    },
    {
      title: "Tăng trưởng vượt trội",
      description: "Tăng trưởng 400% trong ba năm 2021-2024",
      icon: <TrendingUp className="h-6 w-6 text-accent" />
    },
    {
      title: "Quy mô lớn",
      description: "Cung cấp cho hàng nghìn đơn vị trung tâm giống và các trang trại",
      icon: <Users className="h-6 w-6 text-accent" />
    }
  ];

  const facilities = [
    "Trại hạt nhân Duroc Đài Loan",
    "Hệ thống trại GGP, GP, PS: Axiom, Cooperl, Danish Genetics",
    "Hệ thống trang trại hạt nhân vệ tinh"
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Metafarm ký kết hợp tác chiến lược với Danish Genetics",
      summary: "Thỏa thuận hợp tác mới mở ra cơ hội nhập khẩu dòng giống chất lượng cao từ Đan Mạch, nâng cao chất lượng đàn heo giống tại Việt Nam. Dự kiến sẽ mang về 500 con heo giống chất lượng cao trong quý IV/2024.",
      date: "2024-08-15",
      category: "Hợp tác",
      image: "/api/placeholder/400/250",
      readTime: "3 phút đọc"
    },
    {
      id: 2,
      title: "Kỹ thuật chăn nuôi heo giống hiện đại - Xu hướng 2024",
      summary: "Tổng quan về các kỹ thuật chăn nuôi tiên tiến giúp nâng cao năng suất và chất lượng đàn heo, giảm chi phí sản xuất cho người chăn nuôi. Ứng dụng công nghệ IoT và AI trong quản lý trang trại.",
      date: "2024-08-10",
      category: "Kỹ thuật",
      image: "/api/placeholder/400/250",
      readTime: "5 phút đọc"
    },
    {
      id: 3,
      title: "Metafarm mở rộng hệ thống trang trại tại miền Bắc",
      summary: "Dự án mở rộng trang trại hạt nhân mới tại Hà Nội với công nghệ tiên tiến, đáp ứng nhu cầu ngày càng tăng của thị trường phía Bắc. Tổng vốn đầu tư 50 tỷ đồng, quy mô 1000 con heo nái.",
      date: "2024-08-05",
      category: "Mở rộng",
      image: "/api/placeholder/400/250",
      readTime: "4 phút đọc"
    },
    {
      id: 4,
      title: "Hội thảo 'Tương lai chăn nuôi bền vững' thành công tốt đẹp",
      summary: "Sự kiện quy tụ hơn 300 chuyên gia và nông dân, chia sẻ kinh nghiệm và định hướng phát triển chăn nuôi xanh, bền vững. Giới thiệu các giải pháp giảm khí thải và tối ưu hóa chi phí.",
      date: "2024-07-28",
      category: "Sự kiện",
      image: "/api/placeholder/400/250",
      readTime: "6 phút đọc"
    },
    {
      id: 5,
      title: "Metafarm đạt chứng nhận ISO 9001:2015 về quản lý chất lượng",
      summary: "Công ty chính thức nhận chứng nhận ISO 9001:2015, khẳng định cam kết về chất lượng sản phẩm và dịch vụ. Đây là bước tiến quan trọng trong việc nâng cao uy tín và thương hiệu của Metafarm.",
      date: "2024-07-20",
      category: "Chứng nhận",
      image: "/api/placeholder/400/250",
      readTime: "3 phút đọc"
    },
    {
      id: 6,
      title: "Dự án trang trại thông minh với công nghệ AI và IoT",
      summary: "Triển khai hệ thống giám sát tự động 24/7 với cảm biến nhiệt độ, độ ẩm và chất lượng không khí. Ứng dụng AI để dự đoán và cảnh báo sớm các bệnh tật, tối ưu hóa hiệu quả chăn nuôi.",
      date: "2024-07-15",
      category: "Công nghệ",
      image: "/api/placeholder/400/250",
      readTime: "7 phút đọc"
    },
    {
      id: 7,
      title: "Thành công trong việc nhập khẩu 200 con heo Duroc từ Đài Loan",
      summary: "Lô heo giống Duroc chất lượng cao đã về đến trang trại của Metafarm, đáp ứng tiêu chuẩn khắt khe về sức khỏe và di truyền. Đây là bước quan trọng trong chiến lược đa dạng hóa nguồn gen.",
      date: "2024-07-10",
      category: "Nhập khẩu",
      image: "/api/placeholder/400/250",
      readTime: "4 phút đọc"
    },
    {
      id: 8,
      title: "Khóa đào tạo 'Kỹ thuật chăn nuôi hiện đại' cho nông dân",
      summary: "Chương trình đào tạo miễn phí dành cho 100 nông dân trong khu vực, chia sẻ kiến thức về dinh dưỡng, phòng bệnh và quản lý trang trại hiệu quả. Góp phần nâng cao trình độ chăn nuôi của người dân.",
      date: "2024-07-05",
      category: "Đào tạo",
      image: "/api/placeholder/400/250",
      readTime: "5 phút đọc"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* About Section - Giới thiệu về Metafarm */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Giới thiệu về Metafarm
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Công ty trẻ với đội ngũ nhân sự có kinh nghiệm, tầm nhìn và kế hoạch rõ ràng,
                hướng đến những giá trị cốt lõi thiết thực trong ngành chăn nuôi
              </p>
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
            <div className="mb-16 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Đối tác tin cậy
              </h3>
              <p className="text-muted-foreground mb-8">
                Nhiều đơn vị lớn tại Việt Nam tin cậy sản phẩm lợn giống của chúng tôi
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {partners.map((partner, index) => (
                  <Badge key={index} variant="secondary" className="text-lg px-6 py-2">
                    {partner}
                  </Badge>
                ))}
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
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Thành tựu đạt được
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
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
            </div>

            {/* Facilities */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Hệ thống cơ sở
              </h3>
              <div className="grid gap-4 max-w-2xl mx-auto">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{facility}</span>
                  </div>
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

              <NewsCarousel articles={newsArticles} />

              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="group">
                  Xem tất cả tin tức
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
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