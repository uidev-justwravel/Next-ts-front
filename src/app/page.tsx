
import TabsComponentHomepage from '@/components/homepage/TabsComponentHomepage';
import { getAllUsers } from '@/restAPIs/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JustWravel',
  description: 'A Social Travel Community',
};

const allUsers = async () => {
  try {
    const res = getAllUsers()
    return res
  } catch (error) {
    console.log(error)
  }
}

const HomePage = async () => {
  const users = await allUsers()
  return (
    <TabsComponentHomepage users={users?.data.users} />
  );
};

export default HomePage;
