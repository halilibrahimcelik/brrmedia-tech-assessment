'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiRoutes, Todo } from '@/types';
import { fetchedData } from '@/lib/api';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => fetchedData(ApiRoutes.GET_TODOS),
    refetchOnWindowFocus: false,
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export default TodoProvider;
