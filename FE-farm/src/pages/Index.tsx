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
import {
  CheckCircle,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  Newspaper,
  Star,
  Award,
  Shield,
  Zap,
  Heart,
  Target,
  Globe,
  PiggyBank,
  Sparkles
} from "lucide-react";

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
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                SẢN PHẨM CHẤT LƯỢNG CAO
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                SẢN PHẨM LỢN GIỐNG
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chất lượng cao, năng suất vượt trội - Đồng hành cùng sự phát triển bền vững
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                  <Award className="h-6 w-6 text-accent" />
                </div>

                <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-white to-primary/5 backdrop-blur-sm">
                  <CardContent className="p-10">
                    <div className="grid gap-6">
                      {[
                        "Chúng tôi chuyên cung cấp heo dực nhân giống",
                        "Hậu bị nái thuần chủng, ngoại hình đẹp, năng suất chất lượng cao",
                        "Hậu bị 2 máu cao sản, nhập khẩu, năng suất sinh sản vượt trội",
                        "Đội ngũ kỹ thuật chuyên nghiệp, chăm sóc khách hàng nhiệt huyết, tận tâm, tận tình",
                        "Chúng tôi phát triển bằng sự tín nhiệm, tin cậy của khách hàng"
                      ].map((text, index) => (
                        <div key={index} className="flex items-start space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section - Giới thiệu về Metafarm */}
        <section className="py-24 bg-gradient-to-b from-background via-primary/2 to-background relative">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                <Heart className="h-4 w-4" />
                VỀ CHÚNG TÔI
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                GIỚI THIỆU VỀ{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  METAFARM
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Đồng hành cùng ngành chăn nuôi Việt Nam với công nghệ tiên tiến và giải pháp toàn diện
              </p>
            </div>

            {/* Main Company Introduction */}
            <div className="mb-24">
              <div className="max-w-6xl mx-auto">
                <div className="relative">
                  {/* Floating icons */}
                  <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-float">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center animate-float-delayed">
                    <Target className="h-8 w-8 text-accent" />
                  </div>

                  <Card className="border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-white via-primary/2 to-accent/2 backdrop-blur-sm">
                    <CardContent className="p-12">
                      <div className="grid gap-8">
                        {[
                          "Công ty có ngành nghề kinh doanh chính là Chăn nuôi heo, nhập khẩu, phân phối heo giống GGP, GP, PS từ các nước có nền chăn nuôi phát triển như Đan Mạch, Pháp, Đài Loan...",
                          "Sản xuất, phân phối thuốc thú y, thiết bị chăn nuôi.",
                          "Nhiều đơn vị lớn tại Việt Nam tin cậy sản phẩm lợn giống: ANT, Deheus, Hanofeed...",
                          "Là Công ty trẻ nhưng Metafarm với bộ máy nhân sự có kinh nghiệm, tầm nhìn và kế hoạch rõ ràng để hướng đến những giá trị cốt lõi thiết thực.",
                          "Qua đó, chúng tôi cam kết đem đến cho Quý khách hàng những con giống chất lượng nhất, đảm bảo về độ an toàn.",
                          "Với những đối tác chất lượng đến từ Đan Mạch, Pháp mang đến cho khách hàng những heo giống, uy tín chất lượng."
                        ].map((text, index) => (
                          <div key={index} className="flex items-start space-x-6 group hover:bg-white/50 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-primary/20">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors pt-1">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Business Areas */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-foreground mb-4">
                  Lĩnh vực kinh doanh
                </h3>
                <p className="text-lg text-muted-foreground">
                  Giải pháp toàn diện cho ngành chăn nuôi hiện đại
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {businessAreas.map((area, index) => (
                  <Card key={index} className="group border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-primary/5 hover:from-primary/5 hover:to-accent/5 transform hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <div className="text-white">
                            {area.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {area.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
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
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <Globe className="h-4 w-4" />
                  ĐỐI TÁC & KHÁCH HÀNG
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-4">
                  Đối tác uy tín
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sản phẩm heo giống của Metafarm được nhiều đơn vị lớn tại Việt Nam tin dùng và có các đối tác uy tín quốc tế
                </p>
              </div>

              {/* Domestic Partners */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    Khách hàng tin cậy tại Việt Nam
                  </h4>
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>
                <div className="flex justify-center gap-6 flex-wrap">
                  {partners.filter(p => p.type === "domestic").map((partner, index) => (
                    <div key={index} className="group">
                      <Badge
                        variant="secondary"
                        className="text-lg px-8 py-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/20 text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        {partner.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* International Partners */}
              <div>
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    Đối tác uy tín từ Đan Mạch và Pháp
                  </h4>
                  <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full"></div>
                </div>
                <div className="flex justify-center gap-6 flex-wrap">
                  {partners.filter(p => p.type === "international").map((partner, index) => (
                    <div key={index} className="group">
                      <Badge
                        variant="outline"
                        className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        {partner.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="mb-24">
              <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20 shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
                  <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.2),transparent_50%)]"></div>
                </div>

                <CardContent className="p-12 text-center relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/80 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                    <Shield className="h-4 w-4" />
                    CAM KẾT CỦA CHÚNG TÔI
                  </div>
                  <h3 className="text-4xl font-bold text-foreground mb-6">
                    Chất lượng là danh dự
                  </h3>
                  <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Chúng tôi cam kết đem đến cho Quý khách hàng những con giống chất lượng nhất,
                      đảm bảo về độ an toàn.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Với những đối tác chất lượng đến từ Đan Mạch, Pháp mang đến cho khách hàng
                      những heo giống uy tín, chất lượng cao.
                    </p>
                  </div>
                  <div className="mt-8 flex justify-center gap-4">
                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium">Chất lượng đảm bảo</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow">
                      <Award className="h-5 w-5 text-accent" />
                      <span className="font-medium">Uy tín quốc tế</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow">
                      <Heart className="h-5 w-5 text-secondary" />
                      <span className="font-medium">Phục vụ tận tâm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-secondary text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <TrendingUp className="h-4 w-4" />
                  THÀNH TỰU
                </div>
                <h3 className="text-5xl font-bold text-foreground mb-6">
                  Con số nói lên tất cả
                </h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Những thành tựu đạt được trong hành trình phát triển và khẳng định vị thế
                </p>
              </div>

              {/* Achievement cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="group border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-primary/5 hover:from-primary/5 hover:to-accent/5 transform hover:-translate-y-3 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10"></div>

                    <CardContent className="p-8 text-center relative z-10">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <div className="text-white">
                            {achievement.icon}
                          </div>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed achievements */}
              <div className="max-w-5xl mx-auto">
                <Card className="border-2 border-accent/20 shadow-2xl bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 backdrop-blur-sm relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%)] bg-[length:20px_20px]"></div>
                  </div>

                  <CardContent className="p-12 relative z-10">
                    <h4 className="text-3xl font-bold text-foreground mb-8 text-center">
                      Chi tiết thành tựu đạt được
                    </h4>
                    <div className="grid gap-6">
                      {[
                        "Hệ thống khách hàng 63 tỉnh thành Việt Nam",
                        "Tăng trưởng 400% trong ba năm 2021-2024",
                        "Cung cấp cho hàng nghìn đơn vị trung tâm giống và các trang trại chăn nuôi lớn nhỏ",
                        "Trại hạt nhân Duroc Đài Loan",
                        "Hệ thống trại GGP, GP, PS: Axiom, Cooperl, Danish Genetics"
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-6 group hover:bg-white/50 p-4 rounded-xl transition-all duration-300">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </div>
                          <p className="text-xl text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors pt-1">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Facilities */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <MapPin className="h-4 w-4" />
                  HỆ THỐNG CƠ SỞ
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-6">
                  Cơ sở vật chất hiện đại
                </h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Hệ thống trang trại và cơ sở sản xuất đạt tiêu chuẩn quốc tế
                </p>
              </div>

              <div className="grid gap-8 max-w-6xl mx-auto">
                {facilities.map((facility, index) => (
                  <Card key={index} className="group border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-r from-white to-primary/5 hover:from-primary/5 hover:to-accent/5 transform hover:-translate-x-2 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-32 h-32 bg-primary/5 rounded-full ${index % 2 === 0 ? '-translate-x-16' : 'translate-x-16'} -translate-y-16`}></div>

                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {facility.title}
                          </h4>
                          <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
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
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <Newspaper className="h-4 w-4" />
                  TIN TỨC & CẬP NHẬT
                </div>
                <h3 className="text-5xl font-bold text-foreground mb-6">
                  Tin tức mới nhất
                </h3>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Cập nhật những thông tin mới nhất về ngành chăn nuôi, công nghệ và hoạt động của Metafarm
                </p>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-primary"></div>
                  <p className="text-muted-foreground mt-6 text-lg">Đang tải tin tức...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <Card className="max-w-md mx-auto border-2 border-red-200 bg-red-50">
                    <CardContent className="p-8">
                      <div className="text-red-500 mb-4">
                        <Newspaper className="h-12 w-12 mx-auto" />
                      </div>
                      <h4 className="text-lg font-semibold text-red-700 mb-2">Không thể tải tin tức</h4>
                      <p className="text-red-600 mb-6">{error}</p>
                      <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        Thử lại
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : articles.length > 0 ? (
                <>
                  <NewsCarousel articles={articles} categories={categories} />
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="group px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      Xem tất cả tin tức
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <Card className="max-w-md mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-8">
                      <div className="text-primary/60 mb-4">
                        <Newspaper className="h-12 w-12 mx-auto" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Chưa có tin tức</h4>
                      <p className="text-muted-foreground">Chúng tôi sẽ cập nhật tin tức mới nhất sớm nhất có thể.</p>
                    </CardContent>
                  </Card>
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