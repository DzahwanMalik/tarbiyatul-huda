import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  PlusCircle,
  RotateCw,
  Search,
  Trash2,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

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
import { useArticles } from "@/hooks/useArticles";
import type { Article, ArticleStatusFilter } from "@/types/Article.type";

const PAGE_SIZE = 10;

const STATUS_TABS: { label: string; value: ArticleStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const ArticlePage = (): React.JSX.Element => {
  const {
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
    setSearchQuery,
    setStatusFilter,
    setCategoryFilter,
    goToPage,
    nextPage,
    prevPage,
    deleteArticle,
    togglePublishStatus,
    refetch,
  } = useArticles({ pageSize: PAGE_SIZE });

  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const handleDelete = async (): Promise<void> => {
    if (!articleToDelete) return;

    const success: boolean = await deleteArticle(articleToDelete.id);
    if (success) {
      toast.add({
        title: "Artikel Dihapus",
        description: `Artikel "${articleToDelete.title}" berhasil dihapus.`,
        type: "success",
      });
      setArticleToDelete(null);
    } else {
      toast.add({
        title: "Gagal Menghapus",
        description: "Terjadi kesalahan saat menghapus artikel.",
        type: "error",
      });
    }
  };

  const handleToggleStatus = async (article: Article): Promise<void> => {
    const newStatus: boolean = !article.is_published;
    const success: boolean = await togglePublishStatus(
      article.id,
      article.is_published,
    );

    if (success) {
      toast.add({
        title: newStatus ? "Artikel Dipublikasikan" : "Artikel Diubah ke Draft",
        description: `Status artikel "${article.title}" berhasil diubah.`,
        type: "success",
      });
    } else {
      toast.add({
        title: "Gagal Mengubah Status",
        description: "Terjadi kesalahan saat mengubah status artikel.",
        type: "error",
      });
    }
  };

  const startEntry: number =
    totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endEntry: number = Math.min(currentPage * PAGE_SIZE, totalCount);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Articles
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola, buat, dan publikasikan seluruh artikel serta berita lembaga.
          </p>
        </div>
        <Button className="w-fit">
          <PlusCircle />
          Create New Article
        </Button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Search & Filter Section */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="w-full lg:max-w-md">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Search className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Cari judul artikel..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setSearchQuery(e.target.value)
                  }
                  className="h-10"
                />
              </InputGroup>
            </div>

            {/* Filters */}
            {/* Status Filter Tabs */}
            <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={(): void => setStatusFilter(tab.value)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    statusFilter === tab.value
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* Table Content */}
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[40%]">Article</TableHead>
                <TableHead className="w-[18%]">Category</TableHead>
                <TableHead className="w-[16%]">Author</TableHead>
                <TableHead className="w-[14%]">Status</TableHead>
                <TableHead className="w-[12%] text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-md shrink-0" />
                        <div className="flex flex-col gap-1.5 w-full">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Skeleton className="ml-auto h-8 w-16 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : articles.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-36 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="size-8 text-muted-foreground/50" />
                      <p className="font-medium text-foreground">
                        Tidak ada artikel ditemukan.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery ||
                        categoryFilter !== "all" ||
                        statusFilter !== "all"
                          ? "Coba sesuaikan kata kunci pencarian atau filter yang dipilih."
                          : "Mulai buat artikel pertama Anda dengan tombol di atas."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article: Article) => (
                  <TableRow key={article.id}>
                    {/* Title & Cover */}
                    <TableCell className="pl-6 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0 border border-border">
                          {article.cover_image ? (
                            <img
                              src={article.cover_image}
                              alt={article.title}
                              className="size-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="size-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 max-w-xs md:max-w-sm lg:max-w-md">
                          <span className="font-semibold text-foreground line-clamp-1">
                            {article.title}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="size-3" />
                            {new Date(article.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-muted-foreground text-sm">
                      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {article.category?.name ?? "Uncategorized"}
                      </span>
                    </TableCell>

                    {/* Author */}
                    <TableCell className="text-muted-foreground text-sm">
                      <div className="flex items-center gap-1.5">
                        <User className="size-3.5 text-muted-foreground" />
                        <span>{article.author?.full_name ?? "Admin"}</span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {article.is_published ? (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Publish/Draft Toggle Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-8 p-0"
                          title={
                            article.is_published
                              ? "Ubah ke Draft"
                              : "Publikasikan"
                          }
                          onClick={(): void => void handleToggleStatus(article)}
                        >
                          {article.is_published ? (
                            <EyeOff className="size-4 text-muted-foreground hover:text-foreground" />
                          ) : (
                            <Eye className="size-4 text-primary hover:text-primary/80" />
                          )}
                        </Button>

                        {/* Delete Action with Confirmation Dialog */}
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-8 p-0 text-destructive hover:bg-destructive/10"
                                onClick={(): void =>
                                  setArticleToDelete(article)
                                }
                                title="Hapus artikel"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            }
                          />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hapus Artikel?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus artikel{" "}
                                <span className="font-semibold text-foreground">
                                  "{articleToDelete?.title}"
                                </span>
                                ? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={isDeleting}>
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={(): void => void handleDelete()}
                                disabled={isDeleting}
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

          {/* Pagination Footer */}
          <div className="flex flex-col gap-4 px-6 py-4 border-t border-border sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">{startEntry}</span>{" "}
              to <span className="font-medium text-foreground">{endEntry}</span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{totalCount}</span>{" "}
              articles
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage <= 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, i: number) => i + 1,
                ).map((pageNum: number) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(): void => goToPage(pageNum)}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= totalPages || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlePage;
