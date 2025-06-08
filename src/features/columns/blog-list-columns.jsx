import { Chip } from '@mui/material';
import { DateTime } from 'src/components/DateTime';
import { BlogListActions, CategoryListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';
import i18n from '../i18n/i18n-config';

// {
//   "_id": "6285e8b48f4c511191384699",
//   "title": "title",
//   "heroImage": "",
//   "content": "",
//   "tag": [
//       ""
//   ],
//   "status": null
// }

export const BlogListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index + 1,
  }),
  columnHelper.accessor('title', {
    header: 'columns.title',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('category.title', {
    header: 'columns.category',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'columns.createdAt',
    cell: ({ getValue }) => <DateTime>{getValue()}</DateTime>,
  }),
  columnHelper.accessor('status', {
    header: 'columns.status',
    cell: ({ getValue }) => handleRenderStatus(getValue()),
  }),
  columnHelper.accessor('action', {
    header: '',
    cell: ({ row: { original } }) => <BlogListActions original={original} />,
  }),
];

function handleRenderStatus(status) {
  switch (status) {
    case 1:
      return <Chip label={i18n.t('blog.status.draft')} color="info" sx={{ width: 130 }} />;
    case 2:
      return <Chip label={i18n.t('blog.status.pending')} color="warning" sx={{ width: 130 }} />;
    case 3:
      return <Chip label={i18n.t('blog.status.visible')} color="success" sx={{ width: 130 }} />;
    case 4:
      return <Chip label={i18n.t('blog.status.rejected')} color="error" sx={{ width: 130 }} />;

    default:
      return <Chip label={''} color="default" sx={{ width: 130 }} />;
  }
}
