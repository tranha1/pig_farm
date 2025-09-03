import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  const features = [
    "Giống GGP, GP, PS chất lượng cao",
    "Quy trình kiểm dịch nghiêm ngặt", 
    "Tư vấn kỹ thuật chuyên nghiệp",
    "Hỗ trợ 24/7"
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})` 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                #1 Nhà cung cấp giống chăn nuôi tại Việt Nam
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Giống Chăn Nuôi
                <span className="text-accent block">Chất Lượng Cao</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Chuyên cung cấp giống GGP, GP, PS với quy trình kiểm dịch quốc tế. 
                Đồng hành cùng nông dân Việt Nam phát triển chăn nuôi bền vững.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Yêu cầu báo giá ngay
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground">
                Tìm hiểu thêm
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">15+</div>
                <div className="text-sm text-gray-300">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-gray-300">Khách hàng tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1M+</div>
                <div className="text-sm text-gray-300">Con giống cung cấp</div>
              </div>
            </div>
          </div>

          {/* Right side - Can add additional content or keep for visual balance */}
          <div className="lg:block hidden">
            {/* This space can be used for additional visual elements if needed */}
          </div>
        </div>
      </div>

      {/* Floating shapes for visual interest */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;
