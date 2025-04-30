'use client';
import TodosForm from './TodoForm';
import { useTodos } from '@/providers/TodosProvider';
import TodoList from './TodoList';

const Todos: React.FC = () => {
  const { error } = useTodos();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TodosForm />
      <TodoList />
    </>
  );
};
export default Todos;
