import StaffTable from '@/components/pages/staff-directory/StaffTable';
import { NextPage } from 'next';

const StaffDirectory: NextPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-5 '>Staff Team</h1>

      <StaffTable />
    </div>
  );
};
export default StaffDirectory;
