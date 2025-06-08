import { useState } from 'react';
import Page from 'src/components/Page';
import { Table } from 'src/components/Table';
import { DutyListColumns, UserListColumns } from 'src/features/columns';
import { useDebounce } from 'src/hooks/useDebounce';
import { useDutyListQuery } from 'src/services/duty-api';
import { useUserListQuery } from 'src/services/user-api';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

export default function UserListPage() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    limit: withDefault(NumberParam, 15),
    title: withDefault(StringParam, ''),
  });
  const { page, limit, title } = query;

  const debouncedTitle = useDebounce(title);
  const { data, error, isLoading } = useUserListQuery({ page, limit, name: debouncedTitle });

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
  };

  return (
    <Page>
      <Table
        data={data?.data || []}
        columns={UserListColumns}
        paginate={paginate}
        toolbar={toolbar}
        isLoading={isLoading}
      />
    </Page>
  );
}
