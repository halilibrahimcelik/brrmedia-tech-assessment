'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiRoutes, Ticket } from '@/types';
import { fetchedData } from '@/lib/api';

interface TicketsContextTypes {
  tickets: Ticket[];
  isLoading: boolean;
  error: Error | null;
  addTickets: (newTodo: Ticket) => void;
}

const TicketsContext = createContext<TicketsContextTypes | undefined>(
  undefined
);

const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: () => fetchedData(ApiRoutes.GET_TICKETS),
    refetchOnWindowFocus: false,
  });

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  const addTickets = (newTodo: Ticket) => {
    setTickets((prevTickets) => [newTodo, ...prevTickets]);
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        isLoading,
        error,
        addTickets,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};

export default TicketsProvider;
