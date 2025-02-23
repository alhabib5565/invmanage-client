// import MyForm from "@/components/from/MyForm";
// import MySelectWithWatch from "@/components/from/MySelectWithWatch";
// import useCustomerOptions from "@/hooks/useCustomerOptions";
// import { useState } from "react";
// import { FieldValues } from "react-hook-form";
// import { SaleSelect } from "./SaleSelect";
// import MySelect from "@/components/from/MySelect";
// import useEmployeeOptions from "@/hooks/useEmployeeOptions";
// import MyInput from "@/components/from/MyInput";
// import MyTextarea from "@/components/from/MyTextarea";

// const CreatePaymentFrom = () => {
//   const [customer, setCustomer] = useState("");

//   const onSubmit = (value: FieldValues) => {
//     console.log(value);
//   };

//   const { employeeNameOptions } = useEmployeeOptions();
//   const { customerOptions } = useCustomerOptions();

//   return (
//     <MyForm onSubmit={onSubmit}>
//       <div className="space-y-4">
//         <MySelectWithWatch
//           onValueChange={setCustomer}
//           name="customer"
//           label="Select Customer"
//           placeholder="Search customer by name"
//           isSuggestion
//           options={customerOptions || []}
//         />
//         <SaleSelect customer={customer} />
//         <MySelect
//           name="collectedBy"
//           label="Collected By"
//           placeholder="Search sales executive"
//           isSuggestion
//           options={employeeNameOptions || []}
//         />
//         <MyInput
//           name="amountCollected"
//           label="Collected Amount"
//           type="number"
//         />
//         <MyInput name="paymentDate" label="Payment Date" type="date" />
//         <MyTextarea rows={3} name="notes" label="Notes" required={false} />
//       </div>
//     </MyForm>
//   );
// };

// export default CreatePaymentFrom;
