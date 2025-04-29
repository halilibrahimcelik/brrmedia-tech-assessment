import Tickets from '@/components/pages/tickets/Tickets';
import { NextPage } from 'next';

const TicketsPage: NextPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Tickets</h1>
      <Tickets />
    </div>
  );
};
export default TicketsPage;
