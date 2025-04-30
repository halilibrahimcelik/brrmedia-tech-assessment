import Tickets from '@/components/pages/tickets/Tickets';
import { Typography } from '@mui/material';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Tickets',
  description: 'Tickets',
  openGraph: {
    title: 'Tickets',
    description: 'Tickets',
    url: '/tickets',
    siteName: 'Tickets',
  },
};
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
