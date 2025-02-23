import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useEditBooksMutation,
  useGetSingleBooksQuery,
} from "@/redux/api/admin/book.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const EditBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [editBook, { isLoading }] = useEditBooksMutation();
  const { data } = useGetSingleBooksQuery(id);

  useEffect(() => {
    if (data?.data?.bookTitle) {
      setBookTitle(data.data.bookTitle);
    }
  }, [data]);

  const onSubmit = async () => {
    if (!bookTitle) {
      return toast.error("Book Title is required");
    }
    const res = await editBook({ data: { bookTitle }, id }).unwrap();
    if (res.data) {
      toast.success(res.message);
      navigate("/admin/book-list");
    } else {
      toast.error("Something went wrong");
    }
    setBookTitle("");
  };
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="mx-auto bg-white rounded-lg max-w-[400px] w-full space-y-8">
        <h4 className="px-6 py-5 bg-white border-b border-[#e3e3e3] text-black text-xl font-semibold">
          Edit Book
        </h4>

        <div className="px-6 pb-5 space-y-6 border-b border-[#e3e3e3]">
          <div className="space-y-2">
            <p>Book title *</p>
            <Input
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Enter Book Title"
              type="text"
            />
          </div>
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
