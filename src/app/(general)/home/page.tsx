import { getServerSession } from 'next-auth';
import PageFrame from '@/components/page-frame';
import { LoginButton, LogoutButton } from '@/components/auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <PageFrame container>
      <h1 className="text-4xl font-bold">Home</h1>
      <p className="mt-4">This is the Home page.</p>
      <h2 className="text-2xl font-bold">Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <div className="mb-2 mt-4">Test the built in login pages:</div>
      <div className="flex space-x-2">
        <LoginButton />
        <LogoutButton />
      </div>
    </PageFrame>
  );
}
