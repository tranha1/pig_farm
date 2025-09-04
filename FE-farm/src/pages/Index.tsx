import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;