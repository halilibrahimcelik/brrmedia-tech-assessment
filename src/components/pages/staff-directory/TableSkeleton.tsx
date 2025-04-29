import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import StaffTableHead from './TableHead';
import { Data, Order } from './StaffTable';

interface TableSkeletonProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
const TableSkeleton: React.FC<TableSkeletonProps> = ({
  order,
  orderBy,
  onRequestSort,
  rowCount,
}) => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='80%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='60%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='100%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='50%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='60%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='40%'
            height={25}
            animation='wave'
          />
        </TableCell>
        <TableCell>
          <Skeleton
            variant='rounded'
            width='40%'
            height={25}
            animation='wave'
          />
        </TableCell>
      </TableRow>
    );
  });
  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <StaffTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              rowCount={rowCount}
            />
            <TableBody>{skeletonRows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TableSkeleton;
