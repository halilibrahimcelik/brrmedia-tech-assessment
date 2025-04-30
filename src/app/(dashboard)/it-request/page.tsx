import RequestForm from '@/components/pages/it-request/RequestForm';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'IT Request',
  description: 'IT Request Form',
  openGraph: {
    title: 'IT Request',
    description: 'IT Request Form',
    url: '/it-request',
    siteName: 'IT Request',
  },
  twitter: {
    title: 'IT Request',
    description: 'IT Request Form',
    card: 'summary_large_image',
  },
};
const ItRequestPage: NextPage = () => {
  return (
    <>
      <RequestForm />
    </>
  );
};
export default ItRequestPage;
