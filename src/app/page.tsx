
import TabsComponentHomepage from '@/components/homepage/TabsComponentHomepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JustWravel',
  description: 'A Social Travel Community',
};
const HomePage = () => {
  return (
    <>
    <TabsComponentHomepage/>
    </>
  );
};

export default HomePage;
