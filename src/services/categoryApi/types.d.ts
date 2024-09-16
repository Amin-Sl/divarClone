export interface CategoryRes {
  name: string;
  slug: string;
  icon: string;
}
export interface CategoryPayload {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  parents: string;
  children: string;
}
export type CategoryList = CategoryPayload[];

export interface DeleteRes {
  _id: string;
}
