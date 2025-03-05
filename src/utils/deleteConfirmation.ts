/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationTrigger } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
import Swal from "sweetalert2";

export const deleteConfirmation = async (
  deleteAction: MutationTrigger<any>,
  id: string
) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res: any = await deleteAction(id).unwrap();
      Swal.fire({
        title: "Deleted!",
        text: res?.message || "Deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  }
};
