import { useState } from 'react';
import { useParams } from 'react-router';
import Page from 'src/components/Page';
import { Table } from 'src/components/Table';
import { BlogCommentListColumns } from 'src/features/columns';
import { useBlogListQuery } from 'src/services/blog-api';
import { useBlogCommentListQuery } from 'src/services/blogComment-api';
import { useCategoryListQuery } from 'src/services/category-api';
import { NumberParam, StringParam, useQueryParam, withDefault } from 'use-query-params';

export default function BlogCommentListPage() {
  const { blogID } = useParams();
  const [query, setQuery] = useState({
    page: 1,
    rowsPerPage: 15,
    title: '',
  });
  const { page, rowsPerPage, title } = query;

  const { data, error, isLoading } = useBlogCommentListQuery({ blog: blogID, page, limit: rowsPerPage, title });

  function onPageChange(e, newPage) {
    setQuery((q) => ({ ...q, page: newPage + 1 }));
  }
  function onRowsPerPageChange(e) {
    setQuery((q) => ({ ...q, limit: e.target.value, page: 1 }));
  }
  function onSearch(newSearch) {
    setQuery((q) => ({ ...q, title: newSearch, page: 1 }));
  }

  const paginate = {
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    count: data?.count,
  };

  const toolbar = {
    search: {
      search: title,
      onSearch,
    },
  };

  return (
    <Page>
      <Table
        data={data?.data || []}
        columns={BlogCommentListColumns}
        paginate={paginate}
        toolbar={toolbar}
        isLoading={isLoading}
      />
    </Page>
  );
}
