import { useState } from 'react';
import Page from 'src/components/Page';
import { Table } from 'src/components/Table';
import { ProjectListColumns } from 'src/features/columns';
import { useProjectListQuery } from 'src/services/project-api';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

export default function ProjectListPage() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    limit: withDefault(NumberParam, 15),
    title: withDefault(StringParam, ''),
  });
  const { page, limit, title } = query;

  const { data, error, isLoading } = useProjectListQuery({ page, limit, title });
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
      label: 'New Project',
      path: '/dashboard/project/create',
    },
  };

  return (
    <Page>
      <Table
        data={data?.data || []}
        columns={ProjectListColumns}
        paginate={paginate}
        toolbar={toolbar}
        isLoading={isLoading}
      />
    </Page>
  );
}
