import { TBook } from "@/components/pages/dashboard/admin/book/book.type";
import { useGetAllBooksQuery } from "@/redux/api/admin/book.api";

const useBookOptions = () => {
  const { data } = useGetAllBooksQuery({});
  const bookOptions = data?.data.map((book: TBook) => ({
    value: book._id,
    label: book.bookTitle,
  }));
  return { bookOptions };
};

export default useBookOptions;
