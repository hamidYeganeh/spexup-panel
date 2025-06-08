import { CircularProgress, TablePagination as MuiTablePagination, Stack, alpha, useTheme } from '@mui/material';

export const TablePagination = (props) => {
  const { paginate } = props;
  const { page, rowsPerPage, count, ...otherProps } = paginate;

  const theme = useTheme();

  return count === 0 ? (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: 52, p: 2, borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.24)}` }}
    >
      <CircularProgress />
    </Stack>
  ) : (
    <MuiTablePagination
      rowsPerPageOptions={[15, 25, 50]}
      component="div"
      count={count || 0}
      page={page - 1}
      rowsPerPage={rowsPerPage}
      {...otherProps}
    />
  );
};
