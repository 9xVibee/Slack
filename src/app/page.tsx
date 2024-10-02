'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import UserButton from '@/features/auth/components/user-button';

const Home = () => {
  const { signOut } = useAuthActions();

  return (
    <>
      <UserButton />
    </>
  );
};

export default Home;
