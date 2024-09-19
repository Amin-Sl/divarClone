import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { usePostCategoryMutation } from "@/services/categoryApi";

import { CategoryRes } from "./types";

export const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRes>();

  const [postCategory, { isLoading }] = usePostCategoryMutation();

  const onSubmit: SubmitHandler<CategoryRes> = async (data) => {
    try {
      await postCategory(data).unwrap();
      toast.success("اضافه شد");
      reset();
    } catch (error) {
      toast.error("خطایی  رخ داد.");
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h1 className="mb-6 border-b-4 border-[#a62626] pb-5">
          دسته بندی جدید
        </h1>

        <div className="mb-6">
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            اسم دسته بندی
          </label>
          <Input
            id="name"
            {...register("name", { required: "اسم دسته بندی ضروری است" })}
            aria-label="اسم دسته بندی"
            placeholder="اسم دسته بندی"
            fullWidth
            className={`rounded-md border p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            اسلاگ
          </label>
          <Input
            id="slug"
            {...register("slug", { required: "اسلاگ ضروری است" })}
            aria-label="اسلاگ"
            placeholder="اسلاگ"
            fullWidth
            className={`rounded-md border p-2 ${errors.slug ? "border-red-500" : "border-gray-300"}`}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="icon" className="mb-1 block text-sm font-medium">
            آیکون
          </label>
          <Input
            id="icon"
            {...register("icon", { required: "آیکون ضروری است" })}
            aria-label="آیکون"
            placeholder="آیکون"
            fullWidth
            className={`rounded-md border p-2 ${errors.icon ? "border-red-500" : "border-gray-300"}`}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className={`w-full rounded-md py-2 text-white ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-[#a62626] hover:bg-[#8d1f1f]"}`}
        >
          {isLoading ? "در حال ارسال..." : "ایجاد"}
        </Button>
      </form>
    </div>
  );
};
