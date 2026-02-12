import {
  ArticleWithoutContent,
  PaginatedArticle,
} from "@pantheon-systems/pcc-react-sdk";
import { useEffect, useState } from "react";

interface Props {
  cursor?: string;
  initialArticles?: PaginatedArticle[] | ArticleWithoutContent[];
  fetcher: (cursor: string | null | undefined) => Promise<{
    data: PaginatedArticle[] | ArticleWithoutContent[];
    newCursor: string;
  }>;
}

export function usePagination({ cursor, initialArticles, fetcher }: Props) {
  const [currentCursor, setCurrentCursor] = useState(cursor);
  const [articlePages, setArticlePages] = useState(
    initialArticles ? [initialArticles] : [],
  );
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async () => {
      if (articlePages[currentPage]) return;

      setFetching(true);
      const { data, newCursor } = await fetcher(currentCursor);
      setFetching(false);
      setArticlePages((prev) => {
        const result = [...prev];
        result[currentPage] = data;
        return result;
      });
      setCurrentCursor(newCursor);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return {
    // Return last page if current page doesn't exist
    data: articlePages[currentPage] || articlePages[articlePages.length - 1],
    fetching,
    onPageChange: setCurrentPage,
    currentPage,
  };
}
