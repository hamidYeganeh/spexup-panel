import { original } from '@reduxjs/toolkit';
import { DateTime } from 'src/components/DateTime';
import { ContactListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

// {
//   "_id": "665dc1ec1f0bb0d98825fe71",
//   "email": "hamidyeganeh82@gmail.com",
//   "message": "hello this is hamids message",
//   "name": "hamid yeganeh",
//   "phone": "+989383729627",
//   "status": 1,
//   "createdAt": "2024-06-03T13:15:24.710Z",
//   "updatedAt": "2024-06-03T13:15:24.710Z",
//   "__v": 0
// }

export const ContactListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index + 1,
  }),
  columnHelper.accessor('name', {
    header: 'columns.name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'columns.phone',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'columns.email',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'columns.createdAt',
    cell: ({ getValue }) => <DateTime>{getValue()}</DateTime>,
  }),
  columnHelper.accessor('status', {
    header: 'columns.status',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('action', {
    header: '',
    cell: ({ row: { original } }) => <ContactListActions original={original} />,
  }),
];
