import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useMedicines, usePigs } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/utils";

const Products = () => {
    // Fetch data from API
    const { data: medicinesData, isLoading: medicinesLoading, error: medicinesError } = useMedicines({ published: true });
    const { data: pigsData, isLoading: pigsLoading, error: pigsError } = usePigs({ published: true });

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

        if (!medicinesData?.data || medicinesData.data.length === 0) {
            return (
                <Alert>
                    <AlertDescription>
                        Hiện tại chưa có sản phẩm thuốc nào được công bố.
                    </AlertDescription>
                </Alert>
            );
        }

        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicinesData.data.map((medicine) => (
                    <Card key={medicine.id}>
                        <CardHeader>
                            <CardTitle className="text-xl">{medicine.name}</CardTitle>
                            <Badge variant="outline">
                                {medicine.is_published ? 'Có sẵn' : 'Hết hàng'}
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
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
                        </CardContent>
                    </Card>
                ))}
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

        if (pigsError || !pigsData?.data || pigsData.data.length === 0) {
            return null; // Don't show error for pigs, just hide the section
        }

        return (
            <section className="mt-16">
                <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                    SẢN PHẨM LỢN HIỆN CÓ
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pigsData.data.map((pig) => (
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
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Sản phẩm META FARM</h1>
                    <p className="text-lg text-muted-foreground">
                        Cung cấp đầy đủ các dòng giống chất lượng cao từ các nước có nền chăn nuôi phát triển
                    </p>
                </div>

                <Tabs defaultValue="breeding-pigs" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="breeding-pigs">Lợn giống</TabsTrigger>
                        <TabsTrigger value="breeding-sows">Nái hậu bị</TabsTrigger>
                        <TabsTrigger value="medicine">Thuốc</TabsTrigger>
                    </TabsList>

                    {/* Lợn giống Tab */}
                    <TabsContent value="breeding-pigs" className="space-y-16">
                        {/* Lợn đực giống */}
                        <section>
                            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                                LỢN ĐỰC GIỐNG
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

                        {/* Heo PS */}
                        <section>
                            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                                HEO PS (PARENT STOCK)
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

                        {/* Dynamic pigs from API */}
                        {renderDynamicPigs()}
                    </TabsContent>

                    {/* Nái hậu bị Tab */}
                    <TabsContent value="breeding-sows">
                        <section>
                            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                                NÁI HẬU BỊ
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
                    </TabsContent>

                    {/* Thuốc Tab */}
                    {/* Medicine Tab - now using API data */}
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
            <Footer />
        </div>
    );
};

export default Products;