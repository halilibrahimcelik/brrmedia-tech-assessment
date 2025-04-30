import { useTodos } from '@/providers/TodosProvider';
import TodoItem from './TodoItem';
import { Pagination } from '@mui/material';
import { useState, useMemo } from 'react';
import TodoSkeleton from './TodoSkeleton';

const TodoList: React.FC = () => {
  const { todos, isLoading } = useTodos();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const loadingSkeletonArray = Array.from(
    { length: itemsPerPage },
    (_, index) => index + 1
  );
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const currentTodos = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return todos.slice(startIndex, endIndex);
  }, [todos, page, itemsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <ul className='grid my-10 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading
          ? loadingSkeletonArray.map((index) => <TodoSkeleton key={index} />)
          : currentTodos.map((todo) => <TodoItem key={todo.id} todos={todo} />)}
      </ul>

      {todos.length > 0 && (
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
    </div>
  );
};

export default TodoList;
