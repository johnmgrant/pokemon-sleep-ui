'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {TeamAnalysisLoadedClient} from '@/ui/team/analysis/client/loaded';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {pokedex} = props;

  const maxEvolutionCount = getPokemonMaxEvolutionCount(Object.values(pokedex).filter(isNotNullish));

  return (
    <UserDataLazyLoad
      options={{type: 'teamAnalysisSetup'}}
      loadingText="Team"
      content={(data, session) => (
        <TeamAnalysisLoadedClient
          preloadedSetup={data?.teamAnalysisSetup}
          maxEvolutionCount={maxEvolutionCount}
          settings={session.data?.user.preloaded.settings}
          {...props}
        />
      )}
    />
  );
};
