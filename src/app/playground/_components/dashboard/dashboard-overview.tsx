import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { IOrderWithFunctionData, Shop, Product } from "../charts-and-data";
import {
  processStatusData,
  processFinancialData,
  formatCurrency,
} from "../charts-and-data";

export function DashboardOverview({
  orders,
  shops,
  products,
  isLoading,
}: {
  orders: IOrderWithFunctionData[];
  shops: Shop[];
  products: Product[];
  isLoading: boolean;
}) {
  const statusData = processStatusData(orders);
  const financialData = processFinancialData(orders);

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalShops = shops.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Products"
          value={totalProducts.toString()}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Shops"
          value={totalShops.toString()}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Orders by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <BarChart
                width={500}
                height={250}
                data={statusData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <XAxis
                  dataKey="status"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Financial Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <PieChart width={500} height={250}>
                <Pie
                  data={financialData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ value }) => `$${value.toLocaleString()}`}
                >
                  {financialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value, name) => [
                    `${name}: $${value.toLocaleString()}`,
                  ]}
                />
                <Legend />
              </PieChart>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: string;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-1/2" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
