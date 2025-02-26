"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

enum OrderStatus {
  Ordered = 0,
  Paid = 100,
  Confirmed = 200,
  Processing = 300,
  Processed = 400,
  Shipped = 500,
  Delivered = 600,
}

type NonOrderedStatus = Exclude<OrderStatus, OrderStatus.Ordered>;
type StatusDistribution = Record<NonOrderedStatus, number>;
type StatusTimeline = Partial<Record<OrderStatus, Date>>;

interface IOrder {
  orderDate: Date;
  amount: number;
  buyerId: number;
  shopId: number;
  productId: number;
  distribution: StatusDistribution;
  timeLine: StatusTimeline;
}

interface Milestone {
  status: OrderStatus;
  date?: Date;
  percentage: number;
  amount: number;
}

export interface IOrderWithFunctionData extends IOrder {
  status: OrderStatus;
  financials: {
    escrow: { amount: number; milestones: Milestone[] };
    pending: { amount: number; milestones: Milestone[] };
    available: { amount: number; milestones: Milestone[] };
  };
}

const columns: ColumnDef<IOrderWithFunctionData>[] = [
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("orderDate") as Date;
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "buyerId",
    header: "Buyer ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      return <div>{OrderStatus[status]}</div>;
    },
  },
  {
    accessorKey: "financials.escrow.amount",
    header: "Escrow",
    cell: ({ row }) => {
      const amount = row.getValue("financials.escrow.amount") as number;
      const milestones = row.original.financials.escrow.milestones;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <h3 className="font-bold mb-1">Escrow Milestones:</h3>
                {milestones.map((milestone, index) => (
                  <div key={index}>
                    {OrderStatus[milestone.status]}: {milestone.percentage}% (
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(milestone.amount)}
                    )
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "financials.pending.amount",
    header: "Pending",
    cell: ({ row }) => {
      const amount = row.getValue("financials.pending.amount") as number;
      const milestones = row.original.financials.pending.milestones;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <h3 className="font-bold mb-1">Pending Milestones:</h3>
                {milestones.map((milestone, index) => (
                  <div key={index}>
                    {OrderStatus[milestone.status]}: {milestone.percentage}% (
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(milestone.amount)}
                    )
                    {milestone.date &&
                      ` - ${milestone.date.toLocaleDateString()}`}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "financials.available.amount",
    header: "Available",
    cell: ({ row }) => {
      const amount = row.getValue("financials.available.amount") as number;
      const milestones = row.original.financials.available.milestones;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <h3 className="font-bold mb-1">Available Milestones:</h3>
                {milestones.map((milestone, index) => (
                  <div key={index}>
                    {OrderStatus[milestone.status]}: {milestone.percentage}% (
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(milestone.amount)}
                    )
                    {milestone.date &&
                      ` - ${milestone.date.toLocaleDateString()}`}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

export function OrdersTable({ orders }: { orders: IOrderWithFunctionData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by buyer ID..."
          value={(table.getColumn("buyerId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("buyerId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
