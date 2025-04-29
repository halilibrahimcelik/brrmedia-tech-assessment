import { Card, Divider, Skeleton, Stack } from '@mui/material';

const CardSkeleton: React.FC = () => {
  return (
    <Card className='p-4 flex flex-col justify-between shadow-md'>
      <Stack spacing={2}>
        <div className='flex items-center gap-2'>
          <Skeleton animation='wave' className='w-6 h-6' variant='circular' />
          <Skeleton animation='wave' variant='text' width='80%' height={32} />
        </div>
        <Divider sx={{ marginTop: 1 }} />
        <Skeleton animation='wave' variant='text' width='100%' height={55} />
      </Stack>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation='vertical' flexItem />}
        className='mt-4'
      >
        <Skeleton variant='text' width='50%' height={30} />
        <Skeleton variant='text' width='50%' height={30} />
      </Stack>
      <Stack spacing={2} direction='column' className='mt-4'>
        <Skeleton variant='text' width='50%' height={30} />
        <div className='flex justify-end w-full'>
          <Skeleton variant='text' width='50%' height={30} />
        </div>
      </Stack>
    </Card>
  );
};
export default CardSkeleton;
