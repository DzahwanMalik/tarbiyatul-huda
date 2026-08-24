import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type {
  Article,
  ArticleCategory,
  ArticleStatusFilter,
  UseArticlesOptions,
} from "@/types/Article.type";

interface UseArticlesReturn {
  articles: Article[];
  categories: ArticleCategory[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  isDeleting: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: ArticleStatusFilter;
  categoryFilter: string;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: ArticleStatusFilter) => void;
  setCategoryFilter: (categoryId: string) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  deleteArticle: (id: string) => Promise<boolean>;
  togglePublishStatus: (id: string, currentStatus: boolean) => Promise<boolean>;
  refetch: () => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 10;

export const useArticles = (
  options: UseArticlesOptions = {},
): UseArticlesReturn => {
  const { initialPage = 1, pageSize = DEFAULT_PAGE_SIZE } = options;

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [statusFilter, setStatusFilter] = useState<ArticleStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories for filtering
  useEffect((): void => {
    const fetchCategories = async (): Promise<void> => {
      const { data, error: catError } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name", { ascending: true });

      if (!catError && data) {
        setCategories(data as ArticleCategory[]);
      }
    };

    void fetchCategories();
  }, []);

  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const refetch = useCallback((): void => {
    setRefreshIndex((prev: number): number => prev + 1);
  }, []);

  useEffect((): (() => void) => {
    let isMounted = true;

    const loadArticles = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const from: number = (currentPage - 1) * pageSize;
        const to: number = from + pageSize - 1;

        let query = supabase
          .from("articles")
          .select(
            "*, category:categories(id, name, slug), author:profiles(id, full_name, role)",
            { count: "exact" },
          )
          .order("created_at", { ascending: false });

        if (searchQuery.trim()) {
          query = query.ilike("title", `%${searchQuery.trim()}%`);
        }

        if (statusFilter === "published") {
          query = query.eq("is_published", true);
        } else if (statusFilter === "draft") {
          query = query.eq("is_published", false);
        }

        if (categoryFilter !== "all") {
          query = query.eq("category_id", categoryFilter);
        }

        const { data, count, error: fetchError } = await query.range(from, to);

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (isMounted) {
          setArticles((data as Article[]) || []);
          setTotalCount(count ?? 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Gagal memuat data artikel",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadArticles();

    return (): void => {
      isMounted = false;
    };
  }, [
    currentPage,
    pageSize,
    searchQuery,
    statusFilter,
    categoryFilter,
    refreshIndex,
  ]);

  const totalPages: number = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleSetSearchQuery = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSetStatusFilter = (status: ArticleStatusFilter): void => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSetCategoryFilter = (categoryId: string): void => {
    setCategoryFilter(categoryId);
    setCurrentPage(1);
  };

  const goToPage = useCallback(
    (page: number): void => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  const nextPage = useCallback((): void => {
    setCurrentPage((prev: number): number => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback((): void => {
    setCurrentPage((prev: number): number => Math.max(prev - 1, 1));
  }, []);

  const deleteArticle = async (id: string): Promise<boolean> => {
    try {
      setIsDeleting(true);
      const { error: deleteError } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menghapus artikel",
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePublishStatus = async (
    id: string,
    currentStatus: boolean,
  ): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from("articles")
        .update({
          is_published: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui status artikel",
      );
      return false;
    }
  };

  return {
    articles,
    categories,
    totalCount,
    totalPages,
    currentPage,
    isLoading,
    isDeleting,
    error,
    searchQuery,
    statusFilter,
    categoryFilter,
    setSearchQuery: handleSetSearchQuery,
    setStatusFilter: handleSetStatusFilter,
    setCategoryFilter: handleSetCategoryFilter,
    goToPage,
    nextPage,
    prevPage,
    deleteArticle,
    togglePublishStatus,
    refetch,
  };
};
