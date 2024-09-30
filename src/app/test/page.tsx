'use client';

import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../convex/_generated/api';

const Page = () => {
  const tasks = useQuery(api.tasks.get);

  return (
    <div>{tasks?.map((task) => <p key={task?.text}>{task?.text}</p>)}</div>
  );
};

export default Page;
