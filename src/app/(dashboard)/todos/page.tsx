import { NextPage } from 'next';

const TodosPage: NextPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold animate-appear'>Todo Page</h1>
      <p className='mt-4 '>Here you can manage your todos!</p>
    </div>
  );
};
export default TodosPage;
