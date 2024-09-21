import baseApi from "../api";

import { CategoryList, CategoryRes, DeleteRes } from "./types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<void, CategoryRes>({
      query: ({ name, icon, slug }) => ({
        url: "category",
        method: "POST",
        body: { name, icon, slug },
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
    getCategory: builder.query<CategoryList, void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: [{ type: "Category" }],
    }),
    deleteCategory: builder.mutation<DeleteRes, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
