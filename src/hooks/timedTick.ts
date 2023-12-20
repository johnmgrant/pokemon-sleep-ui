import React from 'react';


type UseTimedTickOpts = {
  onTick: () => void,
  intervalMs: number,
  rescheduleDeps: React.DependencyList,
};

export const useTimedTick = ({onTick, intervalMs, rescheduleDeps}: UseTimedTickOpts): number => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(onTick, [counter]);
  React.useEffect(() => {
    setInterval(() => setCounter((original) => original + 1), intervalMs);
  }, rescheduleDeps);

  return counter;
};
