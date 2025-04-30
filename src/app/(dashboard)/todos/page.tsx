import Todos from '@/components/pages/todos/Todos';
import { Typography } from '@mui/material';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Todos',
  description: 'Todos',
  openGraph: {
    title: 'Todos',
    description: 'Todos',
    url: '/todos',
    siteName: 'Todos',
  },
};
const TodosPage: NextPage = () => {
  return (
    <div>
      <Typography
        variant='h4'
        sx={{
          marginY: 4,
        }}
      >
        Here you can manage your todos!
      </Typography>
      <Todos />
    </div>
  );
};
export default TodosPage;
