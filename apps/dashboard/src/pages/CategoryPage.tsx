import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileText,
  FolderTree,
  Pencil,
  PlusCircle,
  RotateCw,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useCategories } from "@/hooks/useCategories";
import type {
  CategoryFormValues,
  CategoryWithCount,
} from "@/types/Category.type";

const categorySchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)",
    ),
});

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const CategoryPage = (): React.JSX.Element => {
  const {
    filteredCategories,
    totalCount,
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
  } = useCategories();

  const [dialogMode, setDialogMode] = useState<"create" | "edit" | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<CategoryWithCount | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryWithCount | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleOpenCreate = (): void => {
    form.reset({ name: "", slug: "" });
    setEditingCategory(null);
    setDialogMode("create");
  };

  const handleOpenEdit = (category: CategoryWithCount): void => {
    form.reset({ name: category.name, slug: category.slug });
    setEditingCategory(category);
    setDialogMode("edit");
  };

  const handleCloseDialog = (): void => {
    setDialogMode(null);
    setEditingCategory(null);
    form.reset();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newName: string = e.target.value;
    form.setValue("name", newName, { shouldValidate: true });
    // Auto-generate slug when creating a new category
    if (dialogMode === "create") {
      form.setValue("slug", generateSlug(newName), { shouldValidate: true });
    }
  };

  const onSubmit = async (values: CategoryFormValues): Promise<void> => {
    if (dialogMode === "create") {
      const success: boolean = await createCategory(values);
      if (success) {
        toast.add({
          title: "Kategori Dibuat",
          description: `Kategori "${values.name}" berhasil ditambahkan.`,
          type: "success",
        });
        handleCloseDialog();
      } else {
        toast.add({
          title: "Gagal Menambahkan",
          description: "Terjadi kesalahan saat menambahkan kategori.",
          type: "error",
        });
      }
    } else if (dialogMode === "edit" && editingCategory) {
      const success: boolean = await updateCategory(editingCategory.id, values);
      if (success) {
        toast.add({
          title: "Kategori Diperbarui",
          description: `Kategori "${values.name}" berhasil diperbarui.`,
          type: "success",
        });
        handleCloseDialog();
      } else {
        toast.add({
          title: "Gagal Memperbarui",
          description: "Terjadi kesalahan saat memperbarui kategori.",
          type: "error",
        });
      }
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!categoryToDelete) return;

    const result = await deleteCategory(categoryToDelete.id);
    if (result.success) {
      toast.add({
        title: "Kategori Dihapus",
        description: `Kategori "${categoryToDelete.name}" berhasil dihapus.`,
        type: "success",
      });
      setCategoryToDelete(null);
    } else {
      toast.add({
        title: "Gagal Menghapus",
        description:
          result.message ?? "Terjadi kesalahan saat menghapus kategori.",
        type: "error",
      });
    }
  };

  // Sync form values on editingCategory change
  useEffect((): void => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name,
        slug: editingCategory.slug,
      });
    }
  }, [editingCategory, form]);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Categories
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola daftar kategori dan pengelompokan artikel lembaga.
          </p>
        </div>
        <Button className="w-fit" onClick={handleOpenCreate}>
          <PlusCircle />
          Create New Category
        </Button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Categories Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Bar */}
            <div className="w-full sm:max-w-md">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Search className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Cari nama atau slug kategori..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setSearchQuery(e.target.value)
                  }
                  className="h-10"
                />
              </InputGroup>
            </div>

            {/* Refresh & Summary Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">
                Total: <strong className="text-foreground">{totalCount}</strong>{" "}
                kategori
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-10"
                onClick={(): void => refetch()}
                disabled={isLoading}
                title="Muat ulang data"
              >
                <RotateCw
                  className={`size-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Table Content */}
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[40%]">Category Name</TableHead>
                <TableHead className="w-[30%]">Slug</TableHead>
                <TableHead className="w-[18%]">Articles</TableHead>
                <TableHead className="w-[12%] text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-8 rounded-md shrink-0" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28 font-mono" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Skeleton className="ml-auto h-8 w-16 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-36 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FolderTree className="size-8 text-muted-foreground/50" />
                      <p className="font-medium text-foreground">
                        Tidak ada kategori ditemukan.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery
                          ? "Coba sesuaikan kata kunci pencarian Anda."
                          : "Mulai buat kategori pertama Anda dengan tombol di atas."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((cat: CategoryWithCount) => (
                  <TableRow key={cat.id}>
                    {/* Name */}
                    <TableCell className="pl-6 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Tag className="size-4" />
                        </div>
                        <span className="font-semibold text-foreground">
                          {cat.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* Slug */}
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {cat.slug}
                      </span>
                    </TableCell>

                    {/* Articles Count */}
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        <FileText className="size-3" />
                        {cat.articles_count} artikel
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-8 p-0"
                          title="Edit kategori"
                          onClick={(): void => handleOpenEdit(cat)}
                        >
                          <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-8 p-0 text-destructive hover:bg-destructive/10"
                                onClick={(): void => setCategoryToDelete(cat)}
                                title="Hapus kategori"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            }
                          />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hapus Kategori?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus kategori{" "}
                                <span className="font-semibold text-foreground">
                                  "{categoryToDelete?.name}"
                                </span>
                                ?{" "}
                                {categoryToDelete &&
                                  categoryToDelete.articles_count > 0 && (
                                    <span className="block mt-2 font-medium text-destructive">
                                      Perhatian: Kategori ini memiliki{" "}
                                      {categoryToDelete.articles_count} artikel
                                      terkait. Hapus atau pindahkan artikel
                                      terlebih dahulu sebelum menghapus
                                      kategori.
                                    </span>
                                  )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={isDeleting}>
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={(): void => void handleDelete()}
                                disabled={
                                  isDeleting ||
                                  (categoryToDelete?.articles_count ?? 0) > 0
                                }
                              >
                                {isDeleting ? "Menghapus..." : "Hapus"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create / Edit Modal Dialog */}
      {dialogMode !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in-0">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
              <h2 className="text-xl font-bold font-heading text-foreground">
                {dialogMode === "create"
                  ? "Tambah Kategori Baru"
                  : "Edit Kategori"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {dialogMode === "create"
                  ? "Masukkan nama dan slug untuk kategori artikel baru."
                  : "Perbarui informasi kategori."}
              </p>
            </CardHeader>
            <CardContent>
              <form
                id="category-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FieldGroup>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="category-name">
                          Nama Kategori
                        </FieldLabel>
                        <Input
                          {...field}
                          id="category-name"
                          placeholder="ex: Berita Lembaga"
                          onChange={handleNameChange}
                          aria-invalid={fieldState.invalid}
                          className="h-10"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="category-slug">
                          Slug URL
                        </FieldLabel>
                        <Input
                          {...field}
                          id="category-slug"
                          placeholder="ex: berita-lembaga"
                          aria-invalid={fieldState.invalid}
                          className="h-10 font-mono text-sm"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="flex items-center justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    form="category-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Menyimpan..."
                      : dialogMode === "create"
                        ? "Tambah Kategori"
                        : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
