"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { Shop, User } from "../charts-and-data";
import { getUserName } from "../charts-and-data";

export function ShopsManagement({
  shops,
  users,
  refetch,
  isLoading,
}: {
  shops: Shop[];
  users: User[];
  refetch: () => void;
  isLoading: boolean;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [newShop, setNewShop] = useState<Partial<Shop>>({
    name: "",
    ownerId: 0,
  });

  const handleAddShop = () => {
    if (!newShop.name || !newShop.ownerId) return;

    // In a real app, this would be an API call
    const shopToAdd: Shop = {
      id: Math.floor(Math.random() * 10000),
      name: newShop.name,
      ownerId: newShop.ownerId,
    };

    shops.push(shopToAdd);
    setIsAddDialogOpen(false);
    setNewShop({ name: "", ownerId: 0 });
    refetch();
  };

  const handleEditShop = () => {
    if (!currentShop || !currentShop.name) return;

    // In a real app, this would be an API call
    const shopIndex = shops.findIndex((s) => s.id === currentShop.id);
    if (shopIndex !== -1) {
      shops[shopIndex] = currentShop;
    }

    setIsEditDialogOpen(false);
    setCurrentShop(null);
    refetch();
  };

  const handleDeleteShop = () => {
    if (!currentShop) return;

    // In a real app, this would be an API call
    const shopIndex = shops.findIndex((s) => s.id === currentShop.id);
    if (shopIndex !== -1) {
      shops.splice(shopIndex, 1);
    }

    setIsDeleteDialogOpen(false);
    setCurrentShop(null);
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Shops Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Shop
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No shops found
                </TableCell>
              </TableRow>
            ) : (
              shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>{shop.id}</TableCell>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{getUserName(shop.ownerId, users)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentShop(shop);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentShop(shop);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Add Shop Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Shop</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newShop.name}
                onChange={(e) =>
                  setNewShop({ ...newShop, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="owner" className="text-right">
                Owner
              </label>
              <Select
                value={newShop.ownerId?.toString()}
                onValueChange={(value) =>
                  setNewShop({ ...newShop, ownerId: Number(value) })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an owner" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.nameFirst} {user.nameLast}
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
            <Button onClick={handleAddShop}>Add Shop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Shop Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shop</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right">
                Name
              </label>
              <Input
                id="edit-name"
                value={currentShop?.name || ""}
                onChange={(e) =>
                  setCurrentShop(
                    currentShop
                      ? { ...currentShop, name: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-owner" className="text-right">
                Owner
              </label>
              <Select
                value={currentShop?.ownerId.toString()}
                onValueChange={(value) =>
                  setCurrentShop(
                    currentShop
                      ? { ...currentShop, ownerId: Number(value) }
                      : null
                  )
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an owner" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.nameFirst} {user.nameLast}
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
            <Button onClick={handleEditShop}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Shop Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shop</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the shop &quot;{currentShop?.name}
            &quot;? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteShop}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
