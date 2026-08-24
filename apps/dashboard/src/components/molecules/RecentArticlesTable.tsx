import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentArticles } from "@/hooks/useRecentArticles";
import type { Article } from "@/types/Article.type";

const ROWS_PER_PAGE = 10;

const RecentArticlesTable = (): React.JSX.Element => {
  const {
    articles,
    totalCount,
    totalPages,
    currentPage,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
  } = useRecentArticles({ pageSize: ROWS_PER_PAGE });

  const startEntry: number = totalCount === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endEntry: number = Math.min(currentPage * ROWS_PER_PAGE, totalCount);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Articles
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {error && (
          <div className="mx-6 mb-4 rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%] pl-6">Title</TableHead>
              <TableHead className="w-[30%]">Category</TableHead>
              <TableHead className="w-[20%] text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: ROWS_PER_PAGE }).map((_, index: number) => (
                <TableRow key={index}>
                  <TableCell className="pl-6">
                    <Skeleton className="h-5 w-3/4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Skeleton className="ml-auto h-5 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article: Article) => (
                <TableRow key={article.id}>
                  <TableCell className="pl-6 font-medium text-foreground">
                    <span className="line-clamp-1">{article.title}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {article.category?.name ?? "Uncategorized"}
                  </TableCell>
                  <TableCell className="text-right pr-6">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-4 px-6 py-4 border-t border-border sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{startEntry}</span> to{" "}
            <span className="font-medium text-foreground">{endEntry}</span> of{" "}
            <span className="font-medium text-foreground">{totalCount}</span> articles
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
              {Array.from({ length: totalPages }, (_, i: number) => i + 1).map(
                (pageNum: number) => (
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
                ),
              )}
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
  );
};

export default RecentArticlesTable;
