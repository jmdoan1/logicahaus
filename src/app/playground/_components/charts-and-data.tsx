"use client";

import { useCallback, useRef, useState } from "react";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "../../global";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { OrdersManagement } from "./dashboard/orders-management";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { ItemsManagement } from "./dashboard/items-management";
import { ShopsManagement } from "./dashboard/shops-management";
import { DashboardOverview } from "./dashboard/dashboard-overview";
import { Button } from "@/app/_components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChartsAndData({ inline }: { inline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!inline);
  const [activeTab, setActiveTab] = useState("overview");
  const ref = useRef<HTMLDivElement | null>(null);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const res = await generateMockData();
      return res;
    },
  });

  const orderData = useCallback(
    () => (data?.orders ?? []).map((o) => o.withFunctionData()),
    [data]
  );

  const updateOrderStatus = useCallback(
    (orderId: number) => {
      if (!data) return;

      const orderIndex = data.orders.findIndex((order) => order.id === orderId);
      if (orderIndex === -1) return;

      const order = data.orders[orderIndex];
      const currentStatus = order.status();
      const nextStatus = currentStatus + 100;

      // Only update if there's a next status to move to
      if (nextStatus <= 600) {
        order.timeLine[nextStatus as OrderStatus] = new Date();
        // Force a re-render
        refetch();
      }
    },
    [data, refetch]
  );

  return (
    <section id="charts-and-data">
      <PlayGroundCard
        title="E-commerce Admin Dashboard"
        description="Manage your shops, products, and orders"
        footerText="Admin Dashboard"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/charts-and-data.tsx`}
        navUrl={`/playground${inline ? "/" : "#"}charts-and-data`}
        inline={inline}
      >
        <div className="space-y-4" ref={ref}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Ok that&apos;s enough, thanks{" "}
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Lemme see that data
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isExpanded && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="shops">Shops</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <DashboardOverview
                  orders={orderData()}
                  shops={data?.shops || []}
                  products={data?.products || []}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="shops" className="mt-0">
                <ShopsManagement
                  shops={data?.shops || []}
                  users={data?.users || []}
                  refetch={refetch}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="items" className="mt-0">
                <ItemsManagement
                  products={data?.products || []}
                  shops={data?.shops || []}
                  refetch={refetch}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <OrdersManagement
                  orders={orderData()}
                  products={data?.products || []}
                  shops={data?.shops || []}
                  updateOrderStatus={updateOrderStatus}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </PlayGroundCard>
    </section>
  );
}

export type User = {
  id: number;
  email: string;
  username: string;
  nameFirst: string;
  nameLast: string;
  createdAt: Date;
};

export type Shop = {
  id: number;
  name: string;
  ownerId: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  shopId: number;
};

export enum OrderStatus {
  Ordered = 0,
  Paid = 100,
  Confirmed = 200,
  Processing = 300,
  Processed = 400,
  Shipped = 500,
  Delivered = 600,
}

export type NonOrderedStatus = Exclude<OrderStatus, OrderStatus.Ordered>;
export type StatusDistribution = Record<NonOrderedStatus, number>;
export type StatusTimeline = Partial<Record<OrderStatus, Date>>;

export interface IOrder {
  id: number;
  orderDate: Date;
  amount: number;
  buyerId: number;
  shopId: number;
  productId: number;
  distribution: StatusDistribution;
  timeLine: StatusTimeline;
}

export interface Milestone {
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

export class Order implements IOrder {
  id: number;
  orderDate: Date;
  amount: number;
  buyerId: number;
  shopId: number;
  productId: number;
  distribution: StatusDistribution;
  timeLine: StatusTimeline;

  constructor(order: IOrder) {
    this.id = order.id;
    this.orderDate = order.orderDate;
    this.amount = order.amount;
    this.buyerId = order.buyerId;
    this.shopId = order.shopId;
    this.productId = order.productId;
    this.distribution = order.distribution;
    this.timeLine = order.timeLine;
  }

  status() {
    return (Math.max(...Object.keys(this.timeLine).map((key) => Number(key))) ??
      0) as OrderStatus;
  }

  financials(): {
    escrow: { amount: number; milestones: Milestone[] };
    pending: { amount: number; milestones: Milestone[] };
    available: { amount: number; milestones: Milestone[] };
  } {
    const pendingThresholdHours = 24 * 5; // 5 days
    const now = new Date();

    let pending = 0;
    let available = 0;
    let totalReleased = 0;

    const escrowMilestones: Milestone[] = [];
    const availableMilestones: Milestone[] = [];
    const pendingMilestones: Milestone[] = [];

    // Determine the highest possible status dynamically
    const allStatuses = Object.values(OrderStatus).filter(
      (status) => typeof status === "number"
    ) as number[];
    const highestPossibleStatus = Math.max(...allStatuses);

    // Determine the latest achieved status
    const latestAchievedStatus = this.status();

    // Sort the achieved statuses in ascending order
    const achievedStatuses = Object.keys(this.timeLine)
      .map((key) => Number(key))
      .filter(
        (key) =>
          !isNaN(key) && key !== OrderStatus.Ordered && key in this.distribution
      )
      .sort((a, b) => a - b);

    for (let i = 0; i < allStatuses.length; i++) {
      const statusNumber = allStatuses[i];

      if (
        !(statusNumber in this.timeLine) &&
        statusNumber in this.distribution
      ) {
        const escPercent =
          statusNumber in this.distribution
            ? this.distribution[statusNumber as NonOrderedStatus]
            : 0;
        escrowMilestones.push({
          status: statusNumber as OrderStatus,
          percentage: escPercent,
          amount: this.amount * (escPercent / 100), // Ensure percentage is correctly applied
        });
      }

      if (!(statusNumber in this.distribution)) {
        availableMilestones.push({
          status: statusNumber as OrderStatus,
          percentage: 0,
          amount: 0,
          date: this.timeLine[statusNumber as OrderStatus],
        });
      }
    }

    for (let i = 0; i < achievedStatuses.length; i++) {
      const statusNumber = achievedStatuses[i];

      const releaseDate = this.timeLine[statusNumber as OrderStatus]!;
      const percentage = this.distribution[statusNumber as NonOrderedStatus];

      // Calculate released amount and round to 2 decimals
      let releasedAmount = Math.round(this.amount * percentage) / 100;

      // Determine if this is the highest achieved status
      const isHighestAchieved =
        statusNumber === latestAchievedStatus &&
        latestAchievedStatus === highestPossibleStatus;

      // If it's the highest achieved status, adjust the released amount to account for rounding
      if (isHighestAchieved) {
        releasedAmount = Math.round((this.amount - totalReleased) * 100) / 100;
      }

      // Calculate hours since release
      const hoursSinceRelease =
        (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60);

      // Categorize the released amount
      if (hoursSinceRelease < pendingThresholdHours) {
        pending += releasedAmount;
        pendingMilestones.push({
          status: statusNumber as OrderStatus,
          percentage: percentage,
          amount: releasedAmount,
          date: releaseDate,
        });
      } else {
        available += releasedAmount;
        availableMilestones.push({
          status: statusNumber as OrderStatus,
          percentage: percentage,
          amount: releasedAmount,
          date: releaseDate,
        });
      }

      // Update the total released amount
      totalReleased += releasedAmount;
    }

    // Calculate escrowed funds
    const escrow = Math.max(this.amount - totalReleased, 0);

    return {
      escrow: {
        amount: Math.round(escrow * 100) / 100,
        milestones: escrowMilestones,
      },
      pending: {
        amount: Math.round(pending * 100) / 100,
        milestones: pendingMilestones,
      },
      available: {
        amount: Math.round(available * 100) / 100,
        milestones: availableMilestones,
      },
    };
  }

  withFunctionData(): IOrderWithFunctionData {
    return {
      ...this,
      status: this.status(),
      financials: this.financials(),
    };
  }
}

export function generateIntegerArrayNoZeros(
  length: number,
  total: number
): number[] {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error("Array length must be a positive integer (>= 1).");
  }

  if (!Number.isInteger(total) || total < length) {
    throw new Error(
      "Total must be an integer greater than or equal to the array length."
    );
  }

  if (length === 1) {
    return [total];
  }

  // Step 1: Generate (length - 1) unique random integers between 1 and (total - 1)
  const cuts = new Set<number>();
  while (cuts.size < length - 1) {
    const randomCut = Math.floor(Math.random() * (total - 1)) + 1; // [1, total -1]
    cuts.add(randomCut);
  }

  // Step 2: Sort the cuts in ascending order
  const sortedCuts = Array.from(cuts).sort((a, b) => a - b);

  // Step 3: Calculate the differences between consecutive cuts
  const result: number[] = [];
  let previous = 0;
  for (const cut of sortedCuts) {
    result.push(cut - previous);
    previous = cut;
  }
  result.push(total - previous); // Add the last segment

  return result;
}

export function generateMockUsers(amount: number = 10): User[] {
  return [...Array(amount).keys()].map((): User => {
    return {
      id: Math.floor(Math.random() * 10000),
      email: faker.internet.email(),
      username: faker.internet.username(),
      nameFirst: faker.person.firstName(),
      nameLast: faker.person.lastName(),
      createdAt: faker.date.past(),
    };
  });
}

export function generateMockShops(
  forUsers: User[],
  amountPerUser: number = 1
): Shop[] {
  return forUsers.flatMap((user): Shop[] => {
    return [...Array(amountPerUser).keys()].map((): Shop => {
      return {
        id: Math.floor(Math.random() * 10000),
        name: faker.company.name(),
        ownerId: user.id,
      };
    });
  });
}

export function generateMockProducts(
  forShops: Shop[],
  amountPerShop: number = 5
): Product[] {
  return forShops.flatMap((shop) =>
    Array.from(
      { length: amountPerShop },
      (): Product => ({
        id: Math.floor(Math.random() * 10000),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ min: 100, max: 1500 })),
        shopId: shop.id,
      })
    )
  );
}

export function generateMockOrders(
  users: User[],
  products: Product[],
  amount: number = 5
): IOrder[] {
  const orders: IOrder[] = [...Array(amount).keys()].map((): IOrder => {
    const distributions = generateIntegerArrayNoZeros(6, 100);

    const randNumber = Math.random() * 700;

    const statusesLessThanRand: OrderStatus[] = Object.values(
      OrderStatus
    ).filter(
      (status): status is OrderStatus =>
        typeof status === "number" && status < randNumber
    );

    const timelineDates = [...Array(statusesLessThanRand.length).keys()]
      .map(() => faker.date.recent({ days: 20 }))
      .sort((a, b) => a.valueOf() - b.valueOf());

    const timeline = Object.fromEntries(
      statusesLessThanRand.map((val, ind) => [val, timelineDates[ind]])
    );

    const randUser = users[Math.floor(Math.random() * users.length)];
    const randProduct = products[Math.floor(Math.random() * products.length)];

    return {
      id: Math.floor(Math.random() * 10000),
      orderDate: timeline[Math.min(...statusesLessThanRand)],
      amount: randProduct.price,
      buyerId: randUser.id,
      shopId: randProduct.shopId,
      productId: randProduct.id,
      distribution: {
        [OrderStatus.Paid]: distributions[0],
        [OrderStatus.Confirmed]: distributions[1],
        [OrderStatus.Processing]: distributions[2],
        [OrderStatus.Processed]: distributions[3],
        [OrderStatus.Shipped]: distributions[4],
        [OrderStatus.Delivered]: distributions[5],
      },
      timeLine: timeline,
    };
  });

  return orders;
}

export async function generateMockData() {
  const users = generateMockUsers(5);
  const shops = generateMockShops(users);
  const products = generateMockProducts(shops, 10);
  const orders = generateMockOrders(users, products, 15).map(
    (ord) => new Order(ord)
  );

  return {
    users,
    shops,
    products,
    orders,
  };
}

export function processStatusData(
  orders: IOrderWithFunctionData[]
): { status: string; count: number }[] {
  const statusCounts = orders.reduce((acc, order) => {
    const status: OrderStatus = order.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return Object.keys(statusCounts).map((status) => ({
    status: OrderStatus[Number(status) as OrderStatus],
    count: statusCounts[Number(status) as OrderStatus],
  }));
}

export function processFinancialData(
  orders: IOrderWithFunctionData[]
): { name: string; value: number; color: string }[] {
  const financials = orders.reduce(
    (acc, order) => {
      const { escrow, pending, available } = order.financials;
      acc.escrow += escrow.amount;
      acc.pending += pending.amount;
      acc.available += available.amount;
      return acc;
    },
    { escrow: 0, pending: 0, available: 0 }
  );

  return [
    {
      name: "Escrow",
      value: Math.round(financials.escrow * 100) / 100,
      color: "#FF8042", // Orange
    },
    {
      name: "Pending",
      value: Math.round(financials.pending * 100) / 100,
      color: "#0088FE", // Blue
    },
    {
      name: "Available",
      value: Math.round(financials.available * 100) / 100,
      color: "#00C49F", // Green
    },
  ];
}

export function getUserName(userId: number, users: User[]): string {
  const user = users.find((u) => u.id === userId);
  return user ? `${user.nameFirst} ${user.nameLast}` : "Unknown User";
}

export function getShopName(shopId: number, shops: Shop[]): string {
  const shop = shops.find((s) => s.id === shopId);
  return shop ? shop.name : "Unknown Shop";
}

export function getProductName(productId: number, products: Product[]): string {
  const product = products.find((p) => p.id === productId);
  return product ? product.name : "Unknown Product";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
