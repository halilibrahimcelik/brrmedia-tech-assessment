'use client';

import { formatDateWithoutHour } from '@/utils';
import {
  Card,
  Divider,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CardSkeleton from './CardSkeleton';
import { useTickets } from '@/providers/TicketProvider';
import { useMemo, useState } from 'react';
const Tickets: React.FC = () => {
  const { error, isLoading, tickets } = useTickets();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const currentTickets = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tickets.slice(startIndex, endIndex);
  }, [tickets, page, itemsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'normal':
        return 'info';
      default:
        return 'default';
    }
  };

  if (error) {
    return (
      <Typography variant='body1'>
        There has been an error occured please try again later !
      </Typography>
    );
  }
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isLoading
          ? skeletonArray.map((skeleton) => <CardSkeleton key={skeleton} />)
          : currentTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className='p-4 flex flex-col justify-between shadow-md'
              >
                <Stack spacing={2}>
                  <Typography
                    variant='h6'
                    className='flex items-center gap-1'
                    color='text.primary'
                  >
                    <ReportGmailerrorredOutlinedIcon color='primary' />{' '}
                    <span>{ticket.issue}</span>
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                  <Typography variant='body2' color='text.secondary'>
                    {ticket.description}
                  </Typography>
                </Stack>

                <Stack spacing={2} className='mt-4'>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    divider={<Divider orientation='vertical' flexItem />}
                    spacing={2}
                  >
                    <Typography
                      variant='body2'
                      className='w-full'
                      color='text.secondary'
                    >
                      Priority:{' '}
                      <Chip
                        component={'span'}
                        className='opacity-80'
                        label={ticket.priority}
                        color={priorityColor(ticket.priority)}
                        size='small'
                      />
                    </Typography>
                    <Typography
                      className='w-full'
                      variant='body2'
                      color='text.secondary'
                    >
                      Status:{' '}
                      <Chip
                        component={'span'}
                        color={ticket.status === 'open' ? 'default' : 'success'}
                        size='small'
                        label={ticket.status}
                        icon={
                          ticket.status === 'open' ? (
                            <RadioButtonUncheckedIcon />
                          ) : (
                            <CheckCircleOutlineIcon />
                          )
                        }
                      />
                    </Typography>
                  </Stack>
                  <Tooltip title='Created By' placement='bottom-start'>
                    <Typography variant='body2' color='text.secondary'>
                      <PeopleAltIcon color='primary' /> {ticket.user}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant='caption'
                    textAlign={'right'}
                    color='text.secondary'
                  >
                    <Tooltip title='Created At' placement='left'>
                      <span className='inline-flex items-center'>
                        <CalendarMonthIcon color='primary' />{' '}
                        <span className=''>
                          {formatDateWithoutHour(ticket.createdAt)}
                        </span>
                      </span>
                    </Tooltip>
                  </Typography>
                </Stack>
              </Card>
            ))}
      </div>
      {tickets.length > 0 && (
        <div className='flex justify-center mt-6 mb-10'>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
            size='large'
          />
        </div>
      )}
    </>
  );
};
export default Tickets;
