export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryWithCount extends Category {
  articles_count: number;
}

export interface CategoryFormValues {
  name: string;
  slug: string;
}
