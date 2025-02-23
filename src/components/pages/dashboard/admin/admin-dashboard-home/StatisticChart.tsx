import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type TDailySalesChartData = {
  date: string;
  sales: number;
  due: number;
  paid: number;
}[];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#55C440",
  },
  due: {
    label: "Due",
    color: "#FF575A",
  },
  paid: {
    label: "Paid",
    color: "#FFB949",
  },
} satisfies ChartConfig;

export function StatisticChart({
  dailyChartData,
}: {
  dailyChartData: TDailySalesChartData;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {/* Last 30 Days Daily Sales, Due, and Paid */}
          Showing daily sales, due, and paid for the last 30 days
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={dailyChartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // Shows only "MM-DD"
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="sales"
              type="monotone"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="due"
              type="monotone"
              stroke="var(--color-due)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="paid"
              type="monotone"
              stroke="var(--color-paid)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
