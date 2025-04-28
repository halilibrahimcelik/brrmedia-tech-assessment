import { DrawerHeader, Main } from './styles';

type Props = {
  children: React.ReactNode;
  open: boolean;
};

const DashboardMain: React.FC<Props> = ({ children, open }) => {
  return (
    <Main open={open}>
      <DrawerHeader />
      {children}
    </Main>
  );
};
export default DashboardMain;
