import {
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableBody as MuiTableBody,
  TableFooter as MuiTableFooter,
  Typography,
  Skeleton,
  Stack,
  Button,
  Link,
  TextField,
  Card,
} from '@mui/material';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import { TableSubRow } from '.';
import { useNavigate } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { t } from 'i18next';
import Scrollbar from '../Scrollbar';
import { TablePagination } from './TablePagination';
import { LuPlus, LuSearch } from 'react-icons/lu';

export const Table = (props) => {
  const { data, columns, isLoading, paginate, toolbar, getRowCanExpand, subRowName } = props;

  const pagination = useMemo(
    () => ({
      pageIndex: paginate?.page,
      pageSize: paginate?.rowsPerPage,
    }),
    [paginate]
  );

  const csvFileRef = useRef();
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    state: {
      pagination,
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: paginate?.count,
    getRowCanExpand,
  });

  const getAllColumnsLength = table?.getAllColumns()?.length;

  return (
    <Card>
      <Scrollbar>
        <MuiTableContainer>
          <MuiTable>
            {toolbar && (
              <MuiTableHead sx={{ mb: 1.5, bgcolor: 'transparent !important' }}>
                <MuiTableRow sx={{ bgcolor: 'transparent !important' }}>
                  <MuiTableCell colSpan={getAllColumnsLength} sx={{ bgcolor: 'transparent !important' }}>
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
                      {toolbar?.redirect && (
                        <Button
                          component={Link}
                          href={toolbar?.redirect?.path}
                          variant="contained"
                          size={'small'}
                          startIcon={<LuPlus />}
                        >
                          {toolbar?.redirect?.label}
                        </Button>
                      )}

                      {toolbar?.search && (
                        <TextField
                          placeholder="search..."
                          value={toolbar?.search?.search}
                          onChange={(e) => toolbar?.search?.onSearch(e.target.value)}
                          size={'small'}
                          InputProps={{
                            startAdornment: (
                              <Stack sx={{ mr: 1 }}>
                                <LuSearch />
                              </Stack>
                            ),
                          }}
                        />
                      )}
                    </Stack>
                  </MuiTableCell>
                </MuiTableRow>
              </MuiTableHead>
            )}
            <MuiTableHead>
              {table.getHeaderGroups()?.map((headerGroup, index) => (
                <MuiTableRow key={headerGroup.headers[index].id}>
                  {headerGroup.headers.map((headCell) => (
                    <MuiTableCell key={headCell.id} align={headCell.align || 'left'}>
                      {t(headCell.column.columnDef.header)}
                    </MuiTableCell>
                  ))}
                </MuiTableRow>
              ))}
            </MuiTableHead>
            <MuiTableBody>
              {isLoading ? (
                Array.from(Array(paginate?.rowsPerPage)).map((_, index) => (
                  <MuiTableRow key={index}>
                    {Array.from(Array(getAllColumnsLength)).map((__, index) => (
                      <MuiTableCell key={index}>
                        <Skeleton height={56} w={'100%'} />
                      </MuiTableCell>
                    ))}
                  </MuiTableRow>
                ))
              ) : paginate?.count === 0 ? (
                <MuiTableRow>
                  <MuiTableCell colSpan={getAllColumnsLength} h={'100%'}>
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: 300 }}>
                      <Typography variant={'h3'}>{t('general.messages.noItemsFound')}</Typography>
                    </Stack>
                  </MuiTableCell>
                </MuiTableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <>
                    <MuiTableRow key={row._id}>
                      {row.getVisibleCells().map((cell) => (
                        <MuiTableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </MuiTableCell>
                      ))}
                    </MuiTableRow>
                    {row.getIsExpanded() && (
                      <MuiTableRow key={row._id + row._id}>
                        <MuiTableCell colSpan={row.getVisibleCells()?.length}>
                          {/*<TableSubRow name={subRowName} row={row} />*/}
                        </MuiTableCell>
                      </MuiTableRow>
                    )}
                  </>
                ))
              )}
            </MuiTableBody>
            {paginate?.page && (
              <MuiTableFooter>
                <MuiTableRow>
                  <MuiTableCell colSpan={getAllColumnsLength}>
                    <TablePagination paginate={paginate} />
                  </MuiTableCell>
                </MuiTableRow>
              </MuiTableFooter>
            )}
          </MuiTable>
        </MuiTableContainer>
      </Scrollbar>
    </Card>
  );
};
