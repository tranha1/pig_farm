import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Package, Pill, FileText, Download, Upload } from "lucide-react";
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

  const handleDownloadTemplate = (type: string) => {
    const token = localStorage.getItem("admin_token");
    const url = `http://localhost:8000/api/admin/export/${type}/template`;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_template.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      console.error('Download failed:', error);
      alert('Download failed: ' + error.message);
    });
  };

  const handleDownloadData = (type: string) => {
    const token = localStorage.getItem("admin_token");
    const url = `http://localhost:8000/api/admin/export/${type}`;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_data.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      console.error('Download failed:', error);
      alert('Download failed: ' + error.message);
    });
  };

  const handleFileUpload = (type: string, file: File) => {
    const token = localStorage.getItem("admin_token");
    const formData = new FormData();
    formData.append('file', file);

    fetch(`http://localhost:8000/api/admin/import/${type}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      if (data.errors && data.errors.length > 0) {
        console.error('Import errors:', data.errors);
      }
    })
    .catch(error => {
      console.error('Import failed:', error);
      alert('Import failed');
    });
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
            <TabsList className="grid w-full grid-cols-4">
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
              <TabsTrigger value="import-export" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Import/Export
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

            <TabsContent value="import-export">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Import/Export Data</CardTitle>
                    <CardDescription>
                      Download templates or export data, and import data from Excel files
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Pigs Section */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">Pig Products</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button onClick={() => handleDownloadTemplate('pigs')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                        <Button onClick={() => handleDownloadData('pigs')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('pigs', file);
                            }}
                            className="hidden"
                            id="pigs-upload"
                          />
                          <label htmlFor="pigs-upload">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Import Data
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Medicines Section */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">Medicines</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button onClick={() => handleDownloadTemplate('medicines')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                        <Button onClick={() => handleDownloadData('medicines')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('medicines', file);
                            }}
                            className="hidden"
                            id="medicines-upload"
                          />
                          <label htmlFor="medicines-upload">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Import Data
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* CMS Section */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">CMS Content</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button onClick={() => handleDownloadTemplate('cms')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                        <Button onClick={() => handleDownloadData('cms')} variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('cms', file);
                            }}
                            className="hidden"
                            id="cms-upload"
                          />
                          <label htmlFor="cms-upload">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Import Data
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;