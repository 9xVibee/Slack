'use client';

import { useState } from 'react';

import { SignInFlow } from '../types';

import SignInCard from './sign-in-car';
import SignUpCard from './sign-up-card';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn');
  const tasks = useQuery(api.tasks.get);

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      {/* <div className="md:h-auto md:w-[420px]">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div> */}
      {tasks?.map((task, index) => {
        return <p key={`${task?.text}-${index}`}>{task?.text}</p>;
      })}
    </div>
  );
};

export default AuthScreen;
