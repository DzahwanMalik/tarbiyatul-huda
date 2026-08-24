export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleAuthor {
  id: string;
  full_name: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  is_published: boolean;
  author_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  category?: ArticleCategory | null;
  author?: ArticleAuthor | null;
}

export type ArticleStatusFilter = "all" | "published" | "draft";

export interface UseArticlesOptions {
  initialPage?: number;
  pageSize?: number;
}

export interface RecentArticlesResponse {
  articles: Article[];
  totalCount: number;
}
