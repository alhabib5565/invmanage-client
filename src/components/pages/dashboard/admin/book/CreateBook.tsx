import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBookMutation } from "@/redux/api/admin/book.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!bookTitle) {
      return toast.error("Book Title is required");
    }
    const res = await createBook({ bookTitle }).unwrap();
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
          Create a new Book
        </h4>

        <div className="px-6 pb-5 space-y-6 border-b border-[#e3e3e3]">
          <div className="space-y-2">
            <p>Book title *</p>
            <Input
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Enter Book Title"
              type="text"
            />
          </div>
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
