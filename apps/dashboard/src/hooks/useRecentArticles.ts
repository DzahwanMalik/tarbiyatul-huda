import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { Article } from "@/types/Article.type";

interface UseRecentArticlesOptions {
  initialPage?: number;
  pageSize?: number;
}

interface UseRecentArticlesReturn {
  articles: Article[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const DEFAULT_PAGE_SIZE = 10;

export const useRecentArticles = (
  options: UseRecentArticlesOptions = {},
): UseRecentArticlesReturn => {
  const { initialPage = 1, pageSize = DEFAULT_PAGE_SIZE } = options;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isMounted = true;

    const loadArticles = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const from: number = (currentPage - 1) * pageSize;
        const to: number = from + pageSize - 1;

        const { data, count, error: fetchError } = await supabase
          .from("articles")
          .select("*, category:categories(id, name, slug)", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

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
            err instanceof Error
              ? err.message
              : "Gagal mengambil data artikel terbaru",
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
  }, [currentPage, pageSize]);

  const totalPages: number = Math.max(1, Math.ceil(totalCount / pageSize));

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

  return {
    articles,
    totalCount,
    totalPages,
    currentPage,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
  };
};
