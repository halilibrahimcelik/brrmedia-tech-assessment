type Props = { children: React.ReactNode };
const DashboardTemplate = ({ children }: Props) => {
  return <main className='animate-appear'>{children}</main>;
};
export default DashboardTemplate;
