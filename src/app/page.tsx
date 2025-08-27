import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { HomeView } from '@/modules/home/ui/views/home-view';

const HomePage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin');
  }

  return (
    <HomeView />
  )
}

export default HomePage
