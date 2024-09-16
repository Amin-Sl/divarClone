export interface CategoryRes {
  name: string;
  icon: string;
  slug: string;
  parent: string;
}
export interface CategoryFormProps {
  refetch: () => void;
}
