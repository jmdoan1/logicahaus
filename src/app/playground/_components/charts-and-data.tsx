"use client";

import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "../../global";
import { faker } from "@faker-js/faker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { OrdersTable } from "./orders-table";

export default function ChartsAndData({ inline }: { inline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!inline);
  const [chartWidth, setChartWidth] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const res = await generateMockData();
      return res;
    },
  });

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) setChartWidth(ref.current.offsetWidth / 2);
  }, [ref]);

  const orderData = useCallback(
    () => (data?.orders ?? []).map((o) => o.withFunctionData()),
    [data]
  );

  const statusData = useCallback(
    () => processStatusData(orderData()),
    [orderData]
  );

  const financialData = useCallback(
    () => processFinancialData(orderData() ?? []),
    [orderData]
  );

  return (
    <section id="charts-and-data">
      <PlayGroundCard
        title="Charts and Data 📊"
        description="Need some reports?"
        footerText="📈"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/charts-and-data.tsx`}
        navUrl={`/playground${inline ? "/" : "/showcase#"}charts-and-data`}
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
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => refetch()}
              >
                Regenerate <RefreshCw />
              </Button>
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col flex-1 text-center items-center mt-10">
                  <p className="text-xl font-extrabold">Orders by Status</p>
                  <BarChart
                    width={chartWidth}
                    height={chartWidth}
                    // width={(ref.current?.offsetWidth ?? 0) / 2}
                    // height={(ref.current?.offsetWidth ?? 0) / 3}
                    data={statusData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Increase bottom margin for tilted labels
                  >
                    <XAxis
                      dataKey="status"
                      angle={-45} // Tilt labels by 45 degrees
                      textAnchor="end" // Align the end of the label text with the tick
                      interval={0} // Ensure all labels are displayed
                    />
                    <YAxis />
                    <RechartsTooltip
                    //   formatter={(value) => [`Count: ${value}`]} // Custom tooltip format
                    />
                    {/* <Legend /> */}
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </div>
                <div className="flex flex-col flex-1 text-center items-center mt-10">
                  <p className="text-xl font-extrabold">Funds</p>
                  <PieChart
                    width={chartWidth}
                    height={chartWidth}
                    // width={(ref.current?.offsetWidth ?? 0) / 2}
                    // height={(ref.current?.offsetWidth ?? 0) / 3}
                  >
                    <Pie
                      data={financialData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ value }) => `$${value.toLocaleString()}`} // Custom label format
                    >
                      {financialData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value, name) => [
                        `${name}: $${value.toLocaleString()}`,
                      ]} // Custom tooltip format
                    />
                    <Legend />
                  </PieChart>
                </div>
              </div>
              {/* <OrdersTable orders={orderData} /> */}
              <div>
                <OrdersTable orders={orderData()} />
              </div>
            </div>
          )}
        </div>
      </PlayGroundCard>
    </section>
  );
}

type User = {
  id: number;
  email: string;
  username: string;
  nameFirst: string;
  nameLast: string;
  createdAt: Date;
};

type Shop = {
  id: number;
  name: string;
  ownerId: number;
};

type Product = {
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

type NonOrderedStatus = Exclude<OrderStatus, OrderStatus.Ordered>;
type StatusDistribution = Record<NonOrderedStatus, number>;
type StatusTimeline = Partial<Record<OrderStatus, Date>>;

interface IOrder {
  id: number;
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

class Order implements IOrder {
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

function generateIntegerArrayNoZeros(length: number, total: number): number[] {
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

function generateMockUsers(amount: number = 10): User[] {
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

function generateMockShops(
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

function generateMockProducts(
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

function generateMockOrders(
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

async function generateMockData() {
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

function processStatusData(
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

function processFinancialData(
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
