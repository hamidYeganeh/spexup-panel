import { DateTime } from 'src/components/DateTime';
import { DutyListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

// {
//   "_id": "665dccc51f0bb0d98825fe91",
//   "content": "any string format",
//   "dutyProcess": [
//       {
//           "title": "title",
//           "content": "content",
//           "_id": "665dccc51f0bb0d98825fe92"
//       }
//   ],
//   "heroImage": "[object File]",
//   "title": "title",
//   "createdAt": "2024-06-03T14:01:41.046Z",
//   "updatedAt": "2024-06-03T14:01:41.046Z",
//   "__v": 0
// }

export const DutyListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index + 1,
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
    cell: ({ row: { original } }) => <DutyListActions original={original} />,
  }),
];
