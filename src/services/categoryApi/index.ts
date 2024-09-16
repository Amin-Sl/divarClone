import baseApi from "../api";

import { CategoryList, CategoryRes, DeleteRes } from "./types";

export const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCategory: builder.mutation<void, CategoryRes>({
      query: ({ name, icon, slug }) => ({
        url: "category",
        method: "POST",
        body: { name, icon, slug },
      }),
    }),
    getCategory: builder.query<CategoryList, void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
    }),
    deleteCategory: builder.mutation<DeleteRes, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePostCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = category;
