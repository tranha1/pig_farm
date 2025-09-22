import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import {
  useMedicines,
  usePigs,
  useNewsArticles,
  useCreateMedicine,
  useUpdateMedicine,
  useDeleteMedicine,
  useCreatePig,
  useUpdatePig,
  useDeletePig,
  useCreateNewsArticle,
  useUpdateNewsArticle,
  useDeleteNewsArticle,
  useImage,
} from "@/hooks/useApi";
import { Medicine, Pig, NewsArticle } from "@/services/api";

interface ProductManagementProps {
  type: "pigs" | "medicines" | "cms";
}

const ProductImage = ({ imageId, className = "w-full h-full object-cover" }: { imageId: number | null, className?: string }) => {
  const { data: imageInfo } = useImage(imageId);

  if (!imageId) {
    return (
      <div className={`flex items-center justify-center text-gray-400 ${className}`}>
        <ImageIcon className="h-12 w-12" />
      </div>
    );
  }

  return (
    <img
      src={imageInfo?.url ? `http://127.0.0.1:8000${imageInfo.url}` : ''}
      alt="Product image"
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling!.classList.remove('hidden');
      }}
    />
  );
};

const ProductManagement = ({ type }: ProductManagementProps) => {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const itemsPerPage = 6;

  // Queries
  const { data: medicines = [], isLoading: medicinesLoading } = useMedicines();
  const { data: pigs = [], isLoading: pigsLoading } = usePigs();
  const { data: newsArticles = [], isLoading: newsLoading } = useNewsArticles();

  // Mutations
  const createMedicine = useCreateMedicine();
  const updateMedicine = useUpdateMedicine();
  const deleteMedicine = useDeleteMedicine();
  const createPig = useCreatePig();
  const updatePig = useUpdatePig();
  const deletePig = useDeletePig();
  const createNewsArticle = useCreateNewsArticle();
  const updateNewsArticle = useUpdateNewsArticle();
  const deleteNewsArticle = useDeleteNewsArticle();

  const isLoading = medicinesLoading || pigsLoading || newsLoading;
  const isAuthenticated = !!localStorage.getItem('admin_token');

  // Type-safe data access
  const medicinesData = type === "medicines" ? medicines : [];
  const pigsData = type === "pigs" ? pigs : [];
  const newsData = type === "cms" ? newsArticles : [];

  // Pagination logic
  const getCurrentData = () => {
    const data = type === "medicines" ? medicinesData : type === "pigs" ? pigsData : newsData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const data = type === "medicines" ? medicinesData : type === "pigs" ? pigsData : newsData;
    return Math.ceil(data.length / itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;

    const formDataUpload = new FormData();
    formDataUpload.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/images/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: formDataUpload,
      });

      if (response.ok) {
        const result = await response.json();
        return result.id; // Assuming the response contains the image ID
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
    return null;
  };

  const handleViewDetail = (product: any) => {
    setDetailProduct(product);
    setIsDetailDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData(getDefaultFormData());
    setSelectedFile(null);
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setSelectedFile(null);
    setImagePreview(product.cover_image_id ? `/api/images/${product.cover_image_id}` : null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      if (type === "medicines") {
        await deleteMedicine.mutateAsync(id);
      } else if (type === "pigs") {
        await deletePig.mutateAsync(id);
      } else {
        await deleteNewsArticle.mutateAsync(id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageId = formData.cover_image_id;

      // Upload new image if selected
      if (selectedFile) {
        imageId = await handleImageUpload();
        if (imageId) {
          formData.cover_image_id = imageId;
        }
      }

      if (editingProduct) {
        // Update
        if (type === "medicines") {
          await updateMedicine.mutateAsync({ id: editingProduct.id, medicine: formData });
        } else if (type === "pigs") {
          await updatePig.mutateAsync({ id: editingProduct.id, pig: formData });
        } else {
          await updateNewsArticle.mutateAsync({ id: editingProduct.id, article: formData });
        }
      } else {
        // Create
        if (type === "medicines") {
          await createMedicine.mutateAsync(formData);
        } else if (type === "pigs") {
          await createPig.mutateAsync(formData);
        } else {
          await createNewsArticle.mutateAsync(formData);
        }
      }

      // Reset form state
      setSelectedFile(null);
      setImagePreview(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const getDefaultFormData = () => {
    switch (type) {
      case "pigs":
        return {
          name: "",
          pig_type_id: null,
          breed_line_id: null,
          unit_id: null,
          price: null,
          note: "",
          is_featured: false,
          cover_image_id: null,
          slug: "",
          is_published: false,
        };
      case "medicines":
        return {
          name: "",
          category_id: null,
          line_id: null,
          ingredients: "",
          indications: "",
          packaging: "",
          unit_id: null,
          price_unit: null,
          price_total: null,
          dose_unit_id: null,
          price_per_dose: null,
          support_price_per_dose: null,
          is_featured: false,
          cover_image_id: null,
          slug: "",
          is_published: false,
        };
      case "cms":
        return {
          kind_id: 1,
          slug: "",
          title: "",
          summary: "",
          body_json: null,
          body_html: "",
          video_url: "",
          external_url: "",
          cover_image_id: null,
          author_name: "",
          seo_title: "",
          seo_desc: "",
          is_published: false,
        };
      default:
        return {};
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case "pigs":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cover_image">Cover Image</Label>
              <div className="space-y-2">
                <Input
                  id="cover_image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {(imagePreview || formData.cover_image_id) && (
                  <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 w-32 h-32 border rounded overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Cover image preview"
                          className="w-full h-full object-cover"
                        />
                      ) : formData.cover_image_id ? (
                        <ProductImage imageId={formData.cover_image_id} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                value={formData.note || ""}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published || false}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </>
        );
      case "medicines":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="packaging">Packaging</Label>
                <Input
                  id="packaging"
                  value={formData.packaging || ""}
                  onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cover_image">Cover Image</Label>
              <div className="space-y-2">
                <Input
                  id="cover_image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {(imagePreview || formData.cover_image_id) && (
                  <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 w-32 h-32 border rounded overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Cover image preview"
                          className="w-full h-full object-cover"
                        />
                      ) : formData.cover_image_id ? (
                        <ProductImage imageId={formData.cover_image_id} />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="indications">Indications</Label>
              <Textarea
                id="indications"
                value={formData.indications || ""}
                onChange={(e) => setFormData({ ...formData, indications: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price_unit">Unit Price</Label>
                <Input
                  id="price_unit"
                  type="number"
                  step="0.01"
                  value={formData.price_unit || ""}
                  onChange={(e) => setFormData({ ...formData, price_unit: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="price_total">Total Price</Label>
                <Input
                  id="price_total"
                  type="number"
                  step="0.01"
                  value={formData.price_total || ""}
                  onChange={(e) => setFormData({ ...formData, price_total: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published || false}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </>
        );
      case "cms":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cover_image">Cover Image</Label>
              <div className="space-y-2">
                <Input
                  id="cover_image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {(imagePreview || formData.cover_image_id) && (
                  <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 w-32 h-32 border rounded overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Cover image preview"
                          className="w-full h-full object-cover"
                        />
                      ) : formData.cover_image_id ? (
                        <ProductImage imageId={formData.cover_image_id} />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="body_html">Content (HTML)</Label>
              <Textarea
                id="body_html"
                value={formData.body_html || ""}
                onChange={(e) => setFormData({ ...formData, body_html: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published || false}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderCards = () => {
    const currentData = getCurrentData();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewDetail(item)}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {type === "cms" ? item.title : item.name}
                  </CardTitle>
                  <CardDescription>
                    ID: {item.id}
                  </CardDescription>
                </div>
                <Badge variant={item.is_published ? "default" : "secondary"}>
                  {item.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Image */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <ProductImage imageId={item.cover_image_id} />
                  <div className="w-full h-full flex items-center justify-center text-gray-400 hidden">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  {type === "medicines" && (
                    <>
                      <p className="text-sm text-gray-600">
                        <strong>Packaging:</strong> {item.packaging || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Price:</strong> ${item.price_unit || item.price_total || 'N/A'}
                      </p>
                    </>
                  )}
                  {type === "pigs" && (
                    <p className="text-sm text-gray-600">
                      <strong>Price:</strong> ${item.price || 'N/A'}
                    </p>
                  )}
                  {type === "cms" && (
                    <>
                      <p className="text-sm text-gray-600">
                        <strong>Author:</strong> {item.author_name || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.summary || 'No summary available'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex space-x-2 w-full">
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleViewDetail(item); }} className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(item); }} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {type === "medicines" ? "Medicines" : type === "pigs" ? "Pig Products" : "CMS Content"} ({type === "medicines" ? medicinesData.length : type === "pigs" ? pigsData.length : newsData.length})
        </h3>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {renderCards()}

      {/* Pagination */}
      {getTotalPages() > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {getTotalPages()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === getTotalPages()}
          >
            Next
          </Button>
        </div>
      )}

      {/* Product Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {detailProduct ? (type === "cms" ? detailProduct.title : detailProduct.name) : ""}
            </DialogTitle>
            <DialogDescription>
              Product Details - ID: {detailProduct?.id}
            </DialogDescription>
          </DialogHeader>
          {detailProduct && (
            <div className="space-y-6 py-4">
              {/* Large Image Display */}
              <div className="w-full">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden max-h-96">
                  <ProductImage imageId={detailProduct.cover_image_id} className="w-full h-full object-contain" />
                </div>
                {!detailProduct.cover_image_id && (
                  <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
                    <ImageIcon className="h-24 w-24" />
                    <span className="ml-2 text-lg">No image available</span>
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                    <div className="space-y-2">
                      <p><strong>Status:</strong> <Badge variant={detailProduct.is_published ? "default" : "secondary"}>{detailProduct.is_published ? "Published" : "Draft"}</Badge></p>
                      <p><strong>Featured:</strong> {detailProduct.is_featured ? "Yes" : "No"}</p>
                      <p><strong>Created:</strong> {new Date(detailProduct.created_at).toLocaleDateString()}</p>
                      <p><strong>Updated:</strong> {new Date(detailProduct.updated_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {type === "pigs" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Pig Details</h3>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {detailProduct.name}</p>
                        <p><strong>Price:</strong> ${detailProduct.price || 'N/A'}</p>
                        <p><strong>Note:</strong> {detailProduct.note || 'N/A'}</p>
                        <p><strong>Slug:</strong> {detailProduct.slug || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {type === "medicines" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Medicine Details</h3>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {detailProduct.name}</p>
                        <p><strong>Packaging:</strong> {detailProduct.packaging || 'N/A'}</p>
                        <p><strong>Indications:</strong> {detailProduct.indications || 'N/A'}</p>
                        <p><strong>Ingredients:</strong> {detailProduct.ingredients || 'N/A'}</p>
                        <p><strong>Unit Price:</strong> ${detailProduct.price_unit || 'N/A'}</p>
                        <p><strong>Total Price:</strong> ${detailProduct.price_total || 'N/A'}</p>
                        <p><strong>Price per Dose:</strong> ${detailProduct.price_per_dose || 'N/A'}</p>
                        <p><strong>Support Price per Dose:</strong> ${detailProduct.support_price_per_dose || 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {type === "cms" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">CMS Content Details</h3>
                      <div className="space-y-2">
                        <p><strong>Title:</strong> {detailProduct.title}</p>
                        <p><strong>Slug:</strong> {detailProduct.slug}</p>
                        <p><strong>Author:</strong> {detailProduct.author_name || 'N/A'}</p>
                        <p><strong>SEO Title:</strong> {detailProduct.seo_title || 'N/A'}</p>
                        <p><strong>SEO Description:</strong> {detailProduct.seo_desc || 'N/A'}</p>
                        <p><strong>Video URL:</strong> {detailProduct.video_url || 'N/A'}</p>
                        <p><strong>External URL:</strong> {detailProduct.external_url || 'N/A'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {type === "cms" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Content</h3>
                      <div className="space-y-2">
                        <div>
                          <strong>Summary:</strong>
                          <p className="mt-1 text-gray-700">{detailProduct.summary || 'No summary available'}</p>
                        </div>
                        <div>
                          <strong>Body Content:</strong>
                          <div className="mt-1 p-3 bg-gray-50 rounded border max-h-60 overflow-y-auto">
                            {detailProduct.body_html ? (
                              <div dangerouslySetInnerHTML={{ __html: detailProduct.body_html }} />
                            ) : (
                              <p className="text-gray-500">No content available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {type === "pigs" && detailProduct.note && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                      <p className="text-gray-700">{detailProduct.note}</p>
                    </div>
                  )}

                  {type === "medicines" && (detailProduct.indications || detailProduct.ingredients) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Medical Information</h3>
                      <div className="space-y-2">
                        {detailProduct.indications && (
                          <div>
                            <strong>Indications:</strong>
                            <p className="mt-1 text-gray-700">{detailProduct.indications}</p>
                          </div>
                        )}
                        {detailProduct.ingredients && (
                          <div>
                            <strong>Ingredients:</strong>
                            <p className="mt-1 text-gray-700">{detailProduct.ingredients}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Close
            </Button>
            <Button variant="default" onClick={() => { setIsDetailDialogOpen(false); handleEdit(detailProduct); }}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit" : "Create"} {type === "medicines" ? "Medicine" : type === "pigs" ? "Pig Product" : "CMS Content"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the details below." : "Fill in the details for the new item."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              {renderFormFields()}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMedicine.isPending || updateMedicine.isPending || createPig.isPending || updatePig.isPending || createNewsArticle.isPending || updateNewsArticle.isPending}>
                {editingProduct ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductManagement;