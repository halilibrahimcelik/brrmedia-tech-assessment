import Tickets from '@/components/pages/tickets/Tickets';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const TicketsPage: NextPage = () => {
  return (
    <div>
      <Typography
        variant='h4'
        sx={{
          marginY: 4,
        }}
      >
        Tickets
      </Typography>
      <Tickets />
    </div>
  );
};
export default TicketsPage;
