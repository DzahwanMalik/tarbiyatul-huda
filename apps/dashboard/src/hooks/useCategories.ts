import { useCallback, useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";
import type {
  CategoryFormValues,
  CategoryWithCount,
} from "@/types/Category.type";

interface SupabaseCategoryRow {
  id: string;
  name: string;
  slug: string;
  articles?: { count: number }[];
}

interface DeleteResult {
  success: boolean;
  message?: string;
}

interface UseCategoriesReturn {
  categories: CategoryWithCount[];
  filteredCategories: CategoryWithCount[];
  totalCount: number;
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  createCategory: (values: CategoryFormValues) => Promise<boolean>;
  updateCategory: (id: string, values: CategoryFormValues) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<DeleteResult>;
  refetch: () => void;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const refetch = useCallback((): void => {
    setRefreshIndex((prev: number): number => prev + 1);
  }, []);

  useEffect((): (() => void) => {
    let isMounted = true;

    const loadCategories = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("categories")
          .select("*, articles(count)")
          .order("name", { ascending: true });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (isMounted) {
          const formatted: CategoryWithCount[] = (
            (data as SupabaseCategoryRow[]) || []
          ).map((item: SupabaseCategoryRow) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            articles_count: item.articles?.[0]?.count ?? 0,
          }));
          setCategories(formatted);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Gagal memuat data kategori",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCategories();

    return (): void => {
      isMounted = false;
    };
  }, [refreshIndex]);

  const filteredCategories: CategoryWithCount[] = useMemo((): CategoryWithCount[] => {
    if (!searchQuery.trim()) return categories;
    const q: string = searchQuery.toLowerCase().trim();
    return categories.filter(
      (cat: CategoryWithCount): boolean =>
        cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q),
    );
  }, [categories, searchQuery]);

  const createCategory = async (
    values: CategoryFormValues,
  ): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const { error: insertError } = await supabase
        .from("categories")
        .insert({
          name: values.name.trim(),
          slug: values.slug.trim(),
        });

      if (insertError) {
        throw new Error(
          insertError.code === "23505"
            ? "Slug kategori sudah digunakan"
            : insertError.message,
        );
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menambahkan kategori",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCategory = async (
    id: string,
    values: CategoryFormValues,
  ): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const { error: updateError } = await supabase
        .from("categories")
        .update({
          name: values.name.trim(),
          slug: values.slug.trim(),
        })
        .eq("id", id);

      if (updateError) {
        throw new Error(
          updateError.code === "23505"
            ? "Slug kategori sudah digunakan"
            : updateError.message,
        );
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memperbarui kategori",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id: string): Promise<DeleteResult> => {
    try {
      setIsDeleting(true);
      const target: CategoryWithCount | undefined = categories.find(
        (c: CategoryWithCount) => c.id === id,
      );

      if (target && target.articles_count > 0) {
        return {
          success: false,
          message: `Kategori tidak dapat dihapus karena masih digunakan oleh ${target.articles_count} artikel.`,
        };
      }

      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      refetch();
      return { success: true };
    } catch (err) {
      const msg: string =
        err instanceof Error ? err.message : "Gagal menghapus kategori";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    categories,
    filteredCategories,
    totalCount: categories.length,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    searchQuery,
    setSearchQuery,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
  };
};
