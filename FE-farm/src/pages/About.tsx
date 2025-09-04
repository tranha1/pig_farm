import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users, MapPin } from "lucide-react";

const About = () => {
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

    return (
        <div className="min-h-screen">
            <Header />
            <main className="py-16">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Giới thiệu về Metafarm
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Công ty trẻ với đội ngũ nhân sự có kinh nghiệm, tầm nhìn và kế hoạch rõ ràng,
                            hướng đến những giá trị cốt lõi thiết thực trong ngành chăn nuôi
                        </p>
                    </div>

                    {/* Business Areas */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                            Lĩnh vực kinh doanh chính
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {businessAreas.map((area, index) => (
                                <Card key={index} className="border border-border shadow-soft">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                {area.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                                    {area.title}
                                                </h3>
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
                        <h2 className="text-2xl font-bold text-foreground mb-6">
                            Đối tác tin cậy
                        </h2>
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
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    Cam kết của chúng tôi
                                </h2>
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
                        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                            Thành tựu đạt được
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {achievements.map((achievement, index) => (
                                <Card key={index} className="border border-border shadow-soft hover:shadow-strong transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <div className="flex justify-center mb-4">
                                            {achievement.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {achievement.title}
                                        </h3>
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
                        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                            Hệ thống cơ sở
                        </h2>
                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {facilities.map((facility, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;