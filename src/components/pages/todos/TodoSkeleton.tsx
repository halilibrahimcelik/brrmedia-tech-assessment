import { Card, Skeleton, Stack } from '@mui/material';

const TodoSkeleton: React.FC = () => {
  return (
    <Card
      component={'li'}
      className='p-4 shadow-md hover:shadow-lg transition-shadow duration-300'
    >
      <Skeleton
        animation='wave'
        variant='text'
        width={'100%'}
        height={35}
        sx={{ mb: 2 }}
      />
      <div className='flex items-center gap-2'>
        <Skeleton
          animation='wave'
          variant='rounded'
          width={30}
          height={30}
          sx={{ mb: 2 }}
        />
        <Skeleton
          animation='wave'
          variant='rounded'
          width={120}
          height={30}
          sx={{ mb: 2 }}
        />
      </div>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Skeleton
          animation='wave'
          variant='rounded'
          width={'100%'}
          height={35}
          sx={{ mb: 2 }}
        />
        <Skeleton
          animation='wave'
          variant='rounded'
          width={'100%'}
          height={35}
          sx={{ mb: 2 }}
        />
      </Stack>
    </Card>
  );
};
export default TodoSkeleton;
