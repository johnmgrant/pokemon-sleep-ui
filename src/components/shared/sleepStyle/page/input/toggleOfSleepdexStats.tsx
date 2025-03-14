import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {MapInputWithDataProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {textFilterButtonStyle} from '@/styles/input';


export const MapInputSleepdexStatsToggle = ({filter, setFilter, isLoggedIn}: MapInputWithDataProps) => {
  const {showSleepdexStats} = filter;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ToggleButton
      active={showSleepdexStats}
      onClick={() => setFilter((original) => ({
        ...original,
        showSleepdexStats: !original.showSleepdexStats,
      } satisfies MapPageFilter))}
      className={clsx('group', textFilterButtonStyle)}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showSleepdexStats ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <BookmarkIcon className="h-5 w-5"/>
      </Flex>
    </ToggleButton>
  );
};
