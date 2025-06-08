import { useState } from 'react';
import Page from 'src/components/Page';
import { Table } from 'src/components/Table';
import { CategoryListColumns } from 'src/features/columns';
import { useDebounce } from 'src/hooks/useDebounce';
import { useCategoryListQuery } from 'src/services/category-api';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

export default function CategoryListPage() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    limit: withDefault(NumberParam, 15),
    title: withDefault(StringParam, ''),
  });
  const { page, limit, title } = query;

  const debouncedTitle = useDebounce(title);
  const { data, error, isLoading } = useCategoryListQuery({ page, limit, title: debouncedTitle });

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
    rowsPerPage: limit,
    onRowsPerPageChange,
    count: data?.count,
  };

  const toolbar = {
    search: {
      search: title,
      onSearch,
    },
    redirect: {
      label: 'New Category',
      path: '/dashboard/category/create',
    },
  };

  return (
    <Page>
      <Table
        data={data?.data || []}
        columns={CategoryListColumns}
        paginate={paginate}
        toolbar={toolbar}
        isLoading={isLoading}
      />
    </Page>
  );
}
