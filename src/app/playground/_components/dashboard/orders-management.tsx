/* eslint-disable @next/next/no-img-element */
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  type IOrderWithFunctionData,
  type Product,
  type Shop,
  OrderStatus,
} from "../charts-and-data";
import {
  formatCurrency,
  getProductName,
  getShopName,
} from "../charts-and-data";

export function OrdersManagement({
  orders,
  products,
  shops,
  updateOrderStatus,
  isLoading,
}: {
  orders: IOrderWithFunctionData[];
  products: Product[];
  shops: Shop[];
  updateOrderStatus: (orderId: number) => void;
  isLoading: boolean;
}) {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] =
    useState<IOrderWithFunctionData | null>(null);

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Ordered:
        return "outline";
      case OrderStatus.Paid:
        return "secondary";
      case OrderStatus.Confirmed:
        return "default";
      case OrderStatus.Processing:
        return "default";
      case OrderStatus.Processed:
        return "default";
      case OrderStatus.Shipped:
        return "secondary";
      case OrderStatus.Delivered:
        return "default";
      default:
        return "outline";
    }
  };

  const getNextStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Ordered:
        return "Mark as Paid";
      case OrderStatus.Paid:
        return "Confirm Order";
      case OrderStatus.Confirmed:
        return "Start Processing";
      case OrderStatus.Processing:
        return "Mark as Processed";
      case OrderStatus.Processed:
        return "Mark as Shipped";
      case OrderStatus.Shipped:
        return "Mark as Delivered";
      case OrderStatus.Delivered:
        return "Completed";
      default:
        return "Update Status";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Orders Management</h2>
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
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {getProductName(order.productId, products)}
                  </TableCell>
                  <TableCell>{getShopName(order.shopId, shops)}</TableCell>
                  <TableCell>{formatCurrency(order.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {OrderStatus[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setCurrentOrder(order);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      View
                    </Button>
                    {order.status < OrderStatus.Delivered && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id)}
                      >
                        {getNextStatusLabel(order.status)}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Order Information</h3>
                  <div className="space-y-2 mt-2">
                    <p>
                      <strong>Order ID:</strong> {currentOrder.id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {currentOrder.orderDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {OrderStatus[currentOrder.status]}
                    </p>
                    <p>
                      <strong>Amount:</strong>{" "}
                      {formatCurrency(currentOrder.amount)}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Product Information</h3>
                  <div className="space-y-2 mt-2">
                    <p>
                      <strong>Product:</strong>{" "}
                      {getProductName(currentOrder.productId, products)}
                    </p>
                    <p>
                      <strong>Shop:</strong>{" "}
                      {getShopName(currentOrder.shopId, shops)}
                    </p>
                    <div className="aspect-video w-full overflow-hidden rounded-md mt-2">
                      <img
                        src={`https://picsum.photos/750?random=${currentOrder.productId}`}
                        alt={getProductName(currentOrder.productId, products)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Financial Information</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="p-3 bg-orange-100 rounded-md">
                    <p className="text-sm text-orange-800 font-medium">
                      Escrow
                    </p>
                    <p className="text-lg font-bold text-orange-800">
                      {formatCurrency(currentOrder.financials.escrow.amount)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-md">
                    <p className="text-sm text-blue-800 font-medium">Pending</p>
                    <p className="text-lg font-bold text-blue-800">
                      {formatCurrency(currentOrder.financials.pending.amount)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-md">
                    <p className="text-sm text-green-800 font-medium">
                      Available
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {formatCurrency(currentOrder.financials.available.amount)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Order Timeline</h3>
                <div className="space-y-2 mt-2">
                  {Object.entries(currentOrder.timeLine)
                    .sort(
                      ([statusA], [statusB]) =>
                        Number(statusA) - Number(statusB)
                    )
                    .map(([status, date]) => (
                      <div key={status} className="flex items-center">
                        <Badge
                          variant={getStatusBadgeVariant(
                            Number(status) as OrderStatus
                          )}
                          className="mr-2"
                        >
                          {OrderStatus[Number(status) as OrderStatus]}
                        </Badge>
                        <span>{date.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {currentOrder && currentOrder.status < OrderStatus.Delivered && (
              <Button
                onClick={() => {
                  updateOrderStatus(currentOrder.id);
                  setIsViewDialogOpen(false);
                }}
              >
                {getNextStatusLabel(currentOrder.status)}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
