import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { CardMedia } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';
import { AppRoutes } from '@/types';

export const metadata: Metadata = {
  title: 'Internal Team Dashboard',
  description: 'Welcome to the internal dashboard',
};
const Icon = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    <CheckRoundedIcon fontSize='inherit' />
  </Box>
);
const HomePage: NextPage = () => {
  const bannerList = [
    {
      title: 'Manage your internal tasks and issues.',
      id: 1,
      icon: Icon,
    },
    {
      title: 'Open tickets for IT related issues and track their status.',
      id: 2,
      icon: Icon,
    },
    {
      title: 'View and manage your own todos and tasks.',
      id: 3,
      icon: Icon,
    },
  ];
  return (
    <main className='container  mx-auto flex items-center py-20 justify-center  w-full'>
      <Card className='max-w-lg  '>
        <CardMedia className='relative'>
          <Image
            className='rounded-t-lg mx-auto '
            width={250}
            height={200}
            src='/banner.svg'
            alt='Banner Image'
          />
        </CardMedia>
        <CardContent>
          <Stack spacing={2} className='flex flex-col items-center'>
            <Typography className='text-center' variant='h2' component='h1'>
              Welcome to <br /> Internal Dashboard
            </Typography>
            <ul>
              {bannerList.map((item) => {
                return (
                  <li key={item.id}>
                    <Stack
                      direction='row'
                      className='flex items-center '
                      spacing={1}
                    >
                      {item.icon}
                      <Typography variant='body2'>{item.title}</Typography>
                    </Stack>
                  </li>
                );
              })}
            </ul>
            <Link href={AppRoutes.STAFF_DIRECTORY}>
              <Button variant='contained' color='primary'>
                Go to Dashboard
              </Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </main>
  );
};
export default HomePage;
