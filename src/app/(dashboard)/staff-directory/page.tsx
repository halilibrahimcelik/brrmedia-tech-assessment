import StaffTable from '@/components/pages/staff-directory/StaffTable';
import { Typography } from '@mui/material';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Staff Directory',
  description: 'Staff Directory',
  openGraph: {
    title: 'Staff Directory',
    description: 'Staff Directory',
    url: '/staff-directory',
    siteName: 'Staff Directory',
  },
  twitter: {
    title: 'Staff Directory',
    description: 'Staff Directory',
  },
};

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
