'use client';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ApiRoutes, StaffMember } from '@/types';
import { formatDate } from '@/utils';
import StaffTableHead from './TableHead';
import TableSkeleton from './TableSkeleton';
import { fetchedData } from '@/lib/api';
export interface Data extends StaffMember {}
export type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const StaffTable: React.FC = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data, isLoading, error } = useQuery<Data[]>({
    queryKey: ['staff'],
    queryFn: () => fetchedData(ApiRoutes.GET_STAFF),
    refetchOnWindowFocus: false,
  });
  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
      console.log('Data:', data);
    }
  }, [data]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      (data || [])
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, order, orderBy, page, rowsPerPage]
  );
  if (isLoading)
    return (
      <TableSkeleton
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        rowCount={rows.length}
      />
    );
  if (error) return <div>Error loading staff members</div>;
  if (!data) return <div>No data found</div>;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='Staff Directory'
            size={'small'}
          >
            <StaffTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody
              sx={{
                '& .MuiTableCell-body': {
                  paddingY: 2,
                  paddingX: 2.5,
                },
              }}
            >
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align='left'>{row.role}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.status}</TableCell>
                    <TableCell align='left'>
                      {formatDate(row.lastLogin)}
                    </TableCell>
                    <TableCell align='left'>{row.driveUsage}</TableCell>
                    <TableCell align='left'>{row.device}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent: 'center',
            '& .MuiTablePagination-toolbar': {
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              justifyContent: 'center',
            },
            '& .MuiTablePagination-menuItem': {
              fontSize: '14px', // Adjust the font size as needed
            },
            '& .MuiTablePagination-spacer': {
              //with breakpoint I want to hide the spacer on mobile devices
              display: { xs: 'none', sm: 'block' },
            },
            '& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel':
              {
                fontSize: { xs: '0.8rem', sm: '1rem' },
              },
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default StaffTable;
