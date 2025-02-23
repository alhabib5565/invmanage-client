import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategoryMutation } from "@/redux/api/admin/category.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!category) {
      return toast.error("Category Title is required");
    }
    const res = await createCategory({ name: category, description }).unwrap();
    if (res.data) {
      toast.success(res.message);
      navigate("/admin/categories");
    } else {
      toast.error("Something went wrong");
    }
    setCategory("");
  };
  return (
    <div>
      <PageHeader isBack />
      <div className="mx-auto bg-white rounded-lg max-w-[500px] w-full space-y-8">
        <h4 className="px-6 py-5 bg-white border-b border-[#e3e3e3] text-black text-xl font-semibold">
          Create a new Category
        </h4>

        <div className="px-6 pb-5 space-y-6 border-b border-[#e3e3e3]">
          <div className="space-y-2">
            <p>Category title *</p>
            <Input
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category Title"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <p>Description</p>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
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

export default CreateCategory;
