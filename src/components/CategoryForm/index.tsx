import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useCreateCategoryMutation } from "@/services/categoryApi";
import { CategoryRes } from "@/services/categoryApi/types";

export const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRes>();

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<CategoryRes> = async (data) => {
    try {
      await createCategory(data).unwrap();
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
          <Input
            {...register("name", { required: "اسم دسته بندی ضروری است" })}
            label="اسم دسته بندی"
            fullWidth
            className="rounded-md border p-2"
            isInvalid={!!errors.name}
          />
        </div>

        <div className="mb-6">
          <Input
            {...register("slug", { required: "اسلاگ ضروری است" })}
            label="اسلاگ"
            fullWidth
            className="rounded-md border p-2"
            isInvalid={!!errors.slug}
          />
        </div>

        <div className="mb-6">
          <Input
            {...register("icon", { required: "آیکون ضروری است" })}
            label="آیکون"
            fullWidth
            className="rounded-md border p-2"
            isInvalid={!!errors.icon}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className={`w-full rounded-md bg-[#a62626] py-2 text-white hover:bg-[#8d1f1f] disabled:cursor-not-allowed disabled:bg-gray-400`}
          disabled={isLoading}
        >
          {isLoading ? "در حال ارسال..." : "ایجاد"}
        </Button>
      </form>
    </div>
  );
};
