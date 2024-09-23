import React from "react";

import { Button, Image } from "@nextui-org/react";
import { Oval } from "react-loader-spinner";

import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/services/categoryApi";
import { CategoryPayload } from "@/services/categoryApi/types";

export const CategoryList = () => {
  const { data, isLoading } = useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {}
  };

  return (
    <div className="mx-auto max-w-xl">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Oval
            height={80}
            width={80}
            color="#10B981"
            wrapperStyle={{}}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4f46e5"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        data?.map(({ _id, name, icon, slug }: CategoryPayload) => (
          <div
            key={_id}
            className="my-5 flex h-14 justify-between rounded-md border-2 p-4"
          >
            <span className="flex items-center gap-3">
              <Image src={`/${icon}.svg`} alt={icon} width={40} height={40} />
              <h5 className="text-sm font-medium">{name}</h5>
            </span>
            <span className="flex items-center gap-3">
              <p className="text-left text-sm text-red-600">Slug: {slug}</p>
              <Button
                className="bg-white text-red-600"
                onClick={() => handleDelete(_id)}
              >
                <Image src="/delete.svg" />
              </Button>
            </span>
          </div>
        ))
      )}
    </div>
  );
};
