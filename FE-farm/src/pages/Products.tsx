import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Products = () => {
    const boarBreeds = [
        {
            name: "DUROC",
            description: "Giống lợn tiêu biểu cho hướng nạc",
            features: [
                "Chỉ số di truyền kiểm tra về sinh trưởng, hiệu suất các tiêu chuẩn chọn giống cơ bản",
                "Tỷ lệ nạc top đầu thị trường, tỷ lệ mỡ giắt 3%",
                "Ưu thế con 3 máu: Rút thời gian nuôi, tốc độ tăng trọng nhanh, tiêu tốn thức ăn ít",
                "Lợn thương phẩm có khả năng đạt biểu cân to từ 130-160kg phù hợp thị yếu tiêu dùng Việt Nam"
            ],
            badge: "Hướng nạc"
        },
        {
            name: "LANDRACE",
            description: "Giống lợn tiêu biểu cho hướng nạc và sinh sản",
            features: [
                "Toàn thân trắng, đầu nhỏ, mõm dài, tai to rủ che mắt, mông đùi đều nở, cao dài",
                "Khả năng thích nghi điều kiện, khí hậu Việt Nam tốt, ăn uống tốt, nhanh lớn",
                "Sản phẩm con thương phẩm đạt biểu cân to, thịt thương phẩm cao"
            ],
            badge: "Nạc & Sinh sản"
        },
        {
            name: "YORKSHIRE",
            description: "Giống lợn tiêu biểu cho hướng sinh sản",
            features: [
                "Toàn thân đều trắng, đầu, mõm ngắn, tai đứng",
                "Chân ngắn, to, móng khoẻ",
                "Khả năng thích nghi tốt, tốc độ lớn nhanh",
                "Sản phẩm cho con thương phẩm có sức đề kháng cao"
            ],
            badge: "Sinh sản"
        },
        {
            name: "PIETRAIN",
            description: "Tỷ lệ nạc cao nhất trong các dòng lợn ngoại",
            features: [
                "Thân hình lông trắng xen lẫn đốm đen, tai đứng đầu to vừa phải",
                "Mông nở, lưng rộng, đùi to, thân hình vạm vỡ, ít lông, mỏng da",
                "Sản phẩm con thương phẩm biểu cân to, tỷ lệ thịt cao",
                "Thường sử dụng lai con Duroc tạo ra dòng đực cuối cùng để nâng cao năng suất thịt"
            ],
            badge: "Nạc cao"
        }
    ];

    const breedingSows = [
        {
            name: "YORKSHIRE (GP)",
            origin: "Tập đoàn Cooperl (Pháp), Tập đoàn Axiom (Pháp)",
            appearance: "Đầu, mõm ngắn. Chân to, khoẻ. Tai dựng đứng",
            cycles: "Đạt 6-8 chu kỳ đẻ",
            performance: "Số con sau cai sữa: có thể đạt tới 12–14 con/lứa",
            advantages: "Tốc độ lớn nhanh, khả năng sinh sản vượt trội nhanh nhất trong các giống lợn nhập ngoại hiện nay"
        },
        {
            name: "LANDRACE (GP)",
            origin: "Tập đoàn Cooperl (Pháp), Tập đoàn Axiom (Pháp)",
            appearance: "Màu da trắng hồng, đầu nhỏ, trường dài. Tai to rủ, cúp xuống kín mặt",
            cycles: "Đạt 6-8 chu kỳ đẻ",
            performance: "Số con sau cai sữa: có thể đạt 12–13,5 con/lứa",
            advantages: "Tốc độ lớn nhanh, khả năng sinh sản tốt. Tỷ lệ nạc cao"
        }
    ];

    const psPigs = [
        {
            name: "Heo PS Axiom",
            health: "(-) PRRS, (-) FMD, (-) AD, (-) PCV2, (-) ASF",
            genetics: "Tổ hợp lai Landrace và Yorkshire",
            features: [
                "100% ưu thế lai, các tính trạng nổi bật về sinh sản",
                "Số vú hoạt động từ 16-20 vú",
                "Số con sau cai sữa cao",
                "Heo sơ sinh có độ đồng đều cao",
                "Heo con sơ sinh từ 1.6 kg/con"
            ],
            note: "(Nái Axiom + tinh heo Duroc)"
        },
        {
            name: "Heo PS Cooperl",
            health: "(-) PRRS, (-) FMD, (-) AD, (-) PCV2, (-) ASF",
            genetics: "Tổ hợp lai Landrace và Yorkshire",
            features: [
                "100% ưu thế lai",
                "Số vú hoạt động từ 14-16 vú, hoa to đẹp",
                "Thích nghi tốt hơn với khí hậu, dịch tễ Việt Nam",
                "Heo sơ sinh có độ đồng đều cao, nuôi con khéo, chất lượng sữa tốt",
                "Heo con sơ sinh từ 1.6 kg/con"
            ],
            note: "(Nái Cooperl + tinh heo Duroc)"
        },
        {
            name: "Heo PS Đan Mạch",
            health: "(-) PRRS, (-) FMD, (-) AD, (-) PCV2, (-) ASF",
            genetics: "Tổ hợp lai Landrace và Yorkshire",
            features: [
                "100% ưu thế lai",
                "Số vú hoạt động từ 14-16 vú",
                "Giá cả phù hợp",
                "Thích nghi tốt hơn với khí hậu, dịch tễ Việt Nam",
                "Heo sơ sinh có độ đồng đều cao, nuôi con khéo",
                "Heo con sơ sinh từ 1.6 kg/con"
            ],
            note: "(Nái Đan Mạch + tinh heo Duroc)"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Sản phẩm META FARM</h1>
                    <p className="text-lg text-muted-foreground">
                        Cung cấp đầy đủ các dòng giống chất lượng cao từ các nước có nền chăn nuôi phát triển
                    </p>
                </div>

                {/* Lợn đực giống */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                        1. LỢN ĐỰC GIỐNG
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {boarBreeds.map((breed, index) => (
                            <Card key={index} className="h-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <CardTitle className="text-xl">{breed.name}</CardTitle>
                                        <Badge variant="secondary">{breed.badge}</Badge>
                                    </div>
                                    <CardDescription>{breed.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {breed.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex">
                                                <span className="mr-2">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Nái hậu bị */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                        2. NÁI HẬU BỊ
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {breedingSows.map((sow, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-xl">{sow.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">NGUỒN GỐC</h4>
                                        <p className="text-sm text-muted-foreground">{sow.origin}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">NGOẠI HÌNH</h4>
                                        <p className="text-sm text-muted-foreground">{sow.appearance}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">SỐ CHU KỲ ĐẺ</h4>
                                        <p className="text-sm text-muted-foreground">{sow.cycles}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">NĂNG SUẤT SINH SẢN</h4>
                                        <p className="text-sm text-muted-foreground">{sow.performance}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">ƯU ĐIỂM</h4>
                                        <p className="text-sm text-muted-foreground">{sow.advantages}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Heo PS */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                        3. HEO PS (PARENT STOCK)
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {psPigs.map((pig, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-xl">{pig.name}</CardTitle>
                                    <Badge variant="outline" className="w-fit">
                                        {pig.health}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">DI TRUYỀN</h4>
                                        <p className="text-sm text-muted-foreground">{pig.genetics}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">ĐặC ĐIỂM</h4>
                                        <ul className="space-y-1">
                                            {pig.features.map((feature, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex">
                                                    <span className="mr-2">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-muted p-3 rounded-lg">
                                        <p className="text-sm text-muted-foreground italic">{pig.note}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Products;