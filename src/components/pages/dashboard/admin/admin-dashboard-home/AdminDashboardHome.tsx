import SummaryCard from "./SummaryCard";
import totalBalance from "../../../../../assets/icon-png/total-balance.png";
import due from "../../../../../assets/icon-png/due.png";
import totalBook from "../../../../../assets/icon-png/total-book.png";
import paid from "../../../../../assets/icon-png/paid.png";
import { useGetAdminDashboardSummaryQuery } from "@/redux/api/admin/report.api";
import Loading from "@/components/shared/Loading";
import { StatisticChart } from "./StatisticChart";
import StockAlertTable from "./StockAlertTable";
import TopSellingProductsChart from "./TopSellingProductsChart";
// import { StatisticChart } from "./StatisticChart";

const AdminDashboardHome = () => {
  const { data, isLoading } = useGetAdminDashboardSummaryQuery("");
  if (isLoading && !data) {
    return <Loading />;
  }
  const summaryData = data?.data;
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={totalBalance}
          title="Total Sell Amount"
          amount={`${summaryData?.totalSellPrice} TK`}
        />
        <SummaryCard
          icon={totalBook}
          title="Total Sell Book"
          amount={`${summaryData?.totalQuantitySold} PCS`}
        />
        <SummaryCard
          icon={paid}
          title="Paid"
          amount={`${summaryData?.totalPaidAmount} TK`}
        />
        <SummaryCard
          icon={due}
          title="due"
          amount={`${summaryData?.totalDueAmount} TK`}
        />
      </div>

      {/* Graph */}
      <div>
        <StatisticChart dailyChartData={summaryData?.dailySalesData} />
      </div>

      {/* stock alert table and top selling product chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <StockAlertTable />
        <TopSellingProductsChart />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
