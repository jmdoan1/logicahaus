/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { Product, Shop } from "../charts-and-data";
import { formatCurrency, getShopName } from "../charts-and-data";

export function ItemsManagement({
  products,
  shops,
  refetch,
  isLoading,
}: {
  products: Product[];
  shops: Shop[];
  refetch: () => void;
  isLoading: boolean;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    shopId: 0,
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.shopId || !newProduct.price) return;

    // In a real app, this would be an API call
    const productToAdd: Product = {
      id: Math.floor(Math.random() * 10000),
      name: newProduct.name,
      price: newProduct.price,
      shopId: newProduct.shopId,
    };

    products.push(productToAdd);
    setIsAddDialogOpen(false);
    setNewProduct({ name: "", price: 0, shopId: 0 });
    refetch();
  };

  const handleEditProduct = () => {
    if (!currentProduct || !currentProduct.name) return;

    // In a real app, this would be an API call
    const productIndex = products.findIndex((p) => p.id === currentProduct.id);
    if (productIndex !== -1) {
      products[productIndex] = currentProduct;
    }

    setIsEditDialogOpen(false);
    setCurrentProduct(null);
    refetch();
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;

    // In a real app, this would be an API call
    const productIndex = products.findIndex((p) => p.id === currentProduct.id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
    }

    setIsDeleteDialogOpen(false);
    setCurrentProduct(null);
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Items Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-8">No items found</div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={`https://picsum.photos/750?random=${product.id}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getShopName(product.shopId, shops)}
                      </p>
                      <p className="font-bold mt-2">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <span className="sr-only">View</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-eye"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right">
                Price
              </label>
              <Input
                id="price"
                type="number"
                value={newProduct.price || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="shop" className="text-right">
                Shop
              </label>
              <Select
                value={newProduct.shopId?.toString()}
                onValueChange={(value) =>
                  setNewProduct({ ...newProduct, shopId: Number(value) })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a shop" />
                </SelectTrigger>
                <SelectContent>
                  {shops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id.toString()}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right">
                Name
              </label>
              <Input
                id="edit-name"
                value={currentProduct?.name || ""}
                onChange={(e) =>
                  setCurrentProduct(
                    currentProduct
                      ? { ...currentProduct, name: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-price" className="text-right">
                Price
              </label>
              <Input
                id="edit-price"
                type="number"
                value={currentProduct?.price || ""}
                onChange={(e) =>
                  setCurrentProduct(
                    currentProduct
                      ? { ...currentProduct, price: Number(e.target.value) }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-shop" className="text-right">
                Shop
              </label>
              <Select
                value={currentProduct?.shopId.toString()}
                onValueChange={(value) =>
                  setCurrentProduct(
                    currentProduct
                      ? { ...currentProduct, shopId: Number(value) }
                      : null
                  )
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a shop" />
                </SelectTrigger>
                <SelectContent>
                  {shops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id.toString()}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <img
                src={`https://picsum.photos/750?random=${currentProduct?.id}`}
                alt={currentProduct?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {currentProduct?.id}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {currentProduct ? formatCurrency(currentProduct.price) : ""}
              </p>
              <p>
                <strong>Shop:</strong>{" "}
                {currentProduct
                  ? getShopName(currentProduct.shopId, shops)
                  : ""}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the item &quot;
            {currentProduct?.name}&quot;? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
