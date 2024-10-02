'use client';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';

const Home = () => {
  const { signOut } = useAuthActions();

  return (
    <>
      <h1>Logged In</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  );
};

export default Home;
