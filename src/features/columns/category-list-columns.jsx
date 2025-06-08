import { DateTime } from 'src/components/DateTime';
import { CategoryListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

export const CategoryListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index } }) => index + 1,
  }),
  columnHelper.accessor('title', {
    header: 'columns.title',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'columns.createdAt',
    cell: ({ getValue }) => <DateTime>{getValue()}</DateTime>,
  }),
  columnHelper.accessor('action', {
    header: '',
    cell: ({ row: { original } }) => <CategoryListActions original={original} />,
  }),
];
