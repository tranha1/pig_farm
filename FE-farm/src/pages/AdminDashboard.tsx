import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Package, Pill, FileText } from "lucide-react";
import ProductManagement from "./ProductManagement";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
      return;
    }

    // For now, just check if token exists - we can add user verification later
    setUser({ username: "admin", role: "admin" });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.username} ({user.role})
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="medicines" className="flex items-center">
                <Pill className="mr-2 h-4 w-4" />
                Medicines
              </TabsTrigger>
              <TabsTrigger value="cms" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                CMS Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>
                    Manage pig products in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductManagement type="pigs" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medicines">
              <Card>
                <CardHeader>
                  <CardTitle>Medicine Management</CardTitle>
                  <CardDescription>
                    Manage medicine products in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductManagement type="medicines" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cms">
              <Card>
                <CardHeader>
                  <CardTitle>CMS Content Management</CardTitle>
                  <CardDescription>
                    Manage CMS content entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductManagement type="cms" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;