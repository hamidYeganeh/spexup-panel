import { DateTime } from 'src/components/DateTime';
import { DutyListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

// {
//     "_id": "6285e8b48f4c511191384668",
//     "status": 2,
//     "username": "mojtabaee2"
// }

export const UserListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index + 1,
  }),
  columnHelper.accessor('username', {
    header: 'columns.username',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'columns.status',
    cell: ({ getValue }) => getValue(),
  }),
];
