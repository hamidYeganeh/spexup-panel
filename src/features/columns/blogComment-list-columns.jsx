import { CategoryListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

export const BlogCommentListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index,
  }),
  columnHelper.accessor('name', {
    header: 'columns.name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('action', {
    header: '',
    cell: ({ getValue }) => <CategoryListActions />,
  }),
];
