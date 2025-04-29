'use client';

import { fetchedData } from '@/lib/api';
import { ApiRoutes } from '@/types';
import { useQuery } from '@tanstack/react-query';

const Tickets: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => fetchedData(ApiRoutes.GET_TICKETS),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log('Tickets:', data);

  return (
    <div>
      <h1>Tickets</h1>
      <p>Tickets page content goes here.</p>
    </div>
  );
};
export default Tickets;
