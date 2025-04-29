'use client';

import { fetchedData } from '@/lib/api';
import { ApiRoutes, Ticket } from '@/types';
import { formatDateWithoutHour } from '@/utils';
import { Card, Divider, Stack, Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CardSkeleton from './CardSkeleton';
const Tickets: React.FC = () => {
  const { data, error, isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: () => fetchedData(ApiRoutes.GET_TICKETS),
  });

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);
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
    <div>
      <Typography variant='h4' color='text.primary' gutterBottom>
        Tickets
      </Typography>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isLoading
          ? skeletonArray.map((skeleton) => <CardSkeleton key={skeleton} />)
          : tickets.map((ticket) => (
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
    </div>
  );
};
export default Tickets;
