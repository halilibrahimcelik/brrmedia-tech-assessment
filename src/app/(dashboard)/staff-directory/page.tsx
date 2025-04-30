import StaffTable from '@/components/pages/staff-directory/StaffTable';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const StaffDirectory: NextPage = () => {
  return (
    <div>
      <Typography
        variant='h4'
        sx={{
          marginY: 4,
        }}
      >
        Staff Team
      </Typography>

      <StaffTable />
    </div>
  );
};
export default StaffDirectory;
