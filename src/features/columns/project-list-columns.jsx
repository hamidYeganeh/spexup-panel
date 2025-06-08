import { DateTime } from 'src/components/DateTime';
import { ProjectListActions } from 'src/features/tableActions';
import { columnHelper } from 'src/utils/columnHelper';

// {
//   "_id": "664a89ffa2c521b2fe19ba71",
//   "fullDescription": "",
//   "name": "",
//   "owner": "full name",
//   "projectDate": "2024-05-19T23:23:43.000Z",
//   "quote": "",
//   "result": "",
//   "shortDescription": "",
//   "workArea": "",
//   "projectInclude": "",
//   "roadmap": "",
//   "slides": [
//       "image hash"
//   ]
// }

export const ProjectListColumns = [
  columnHelper.accessor('index', {
    header: 'columns.index',
    cell: ({ row: { index }, table: { getState } }) => index + 1,
  }),
  columnHelper.accessor('name', {
    header: 'columns.name',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('owner', {
    header: 'columns.owner',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('projectDate', {
    header: 'columns.projectDate',
    cell: ({ getValue }) => <DateTime>{getValue()}</DateTime>,
  }),
  columnHelper.accessor('createdAt', {
    header: 'columns.createdAt',
    cell: ({ getValue }) => <DateTime>{getValue()}</DateTime>,
  }),
  columnHelper.accessor('action', {
    header: '',
    cell: ({ row: { original } }) => <ProjectListActions original={original} />,
  }),
];
