import Todos from '@/components/pages/todos/Todos';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

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
