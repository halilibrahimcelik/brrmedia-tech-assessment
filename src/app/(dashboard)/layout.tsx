'use client';
import DashboardDrawer from '@/components/dashboard/DashboardDrawer';
import DashboardMain from '@/components/dashboard/DashboardMain';
import { useState } from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <aside>
        <DashboardDrawer open={open} setOpen={setOpen} />
      </aside>
      <DashboardMain open={open}>{children} </DashboardMain>
    </>
  );
};
export default DashboardLayout;
