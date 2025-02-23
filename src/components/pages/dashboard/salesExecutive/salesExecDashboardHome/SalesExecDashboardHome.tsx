import Loading from "@/components/shared/Loading";
import { useGetAdminDashboardSummaryQuery } from "@/redux/api/admin/report.api";
import SummaryCard from "../../admin/admin-dashboard-home/SummaryCard";

import totalBalance from "../../../../../assets/icon-png/total-balance.png";
import due from "../../../../../assets/icon-png/due.png";
import totalBook from "../../../../../assets/icon-png/total-book.png";
import paid from "../../../../../assets/icon-png/paid.png";
import { StatisticChart } from "../../admin/admin-dashboard-home/StatisticChart";
import { useAppSelector } from "@/redux/hooks";
import { useGetSingleEmployeeQuery } from "@/redux/api/admin/userManagement.api";

const SalesExecDashboardHome = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: employeeData } = useGetSingleEmployeeQuery(user?.userID);
  const { data, isLoading } = useGetAdminDashboardSummaryQuery(
    {
      salesBy: employeeData?.data?._id,
    },
    { skip: !employeeData?.data?._id }
  );
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
    </div>
  );
};

export default SalesExecDashboardHome;
