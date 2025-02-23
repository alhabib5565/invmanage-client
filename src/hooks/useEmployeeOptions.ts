import { TEmployee } from "@/components/pages/dashboard/admin/employee-management/employee.type";
import { useGetAllEmployeeQuery } from "@/redux/api/admin/userManagement.api";

const useEmployeeOptions = () => {
  const { data } = useGetAllEmployeeQuery({
    role: "sales-executive",
  });
  const employeeNameOptions = data?.data.map((emp: TEmployee) => ({
    label: emp.employeeName,
    value: emp._id,
  }));

  return { employeeNameOptions };
};

export default useEmployeeOptions;
