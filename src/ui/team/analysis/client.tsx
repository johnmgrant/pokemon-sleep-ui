'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/input/main';
import {TeamAnalysisSnorlaxFavorite} from '@/ui/team/analysis/input/snorlaxFavorite';
import {TeamAnalysisResult} from '@/ui/team/analysis/result/main';
import {TeamAnalysisSelectablePokemon} from '@/ui/team/analysis/selectable';
import {TeamAnalysisDataProps, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisClient = (props: TeamAnalysisDataProps) => {
  const {pokedex, session} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);

  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: session?.user.data.teamAnalysisSetup?.snorlaxFavorite,
  });
  const [setup, setSetup] = React.useState<TeamAnalysisTeamSetup>(migrate({
    original: {
      team: {
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
      },
      bonus: {
        overall: 80,
        ingredient: 16,
      },
      version: 1,
    },
    override: session?.user.data.teamAnalysisSetup,
    migrators: teamAnalysisSetupMigrators,
  }));

  return (
    <>
      <TeamAnalysisPokemonFilter filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <TeamAnalysisSelectablePokemon
          setSetup={setSetup}
          isIncluded={isIncluded}
          pokemon={pokemon}
        />
      </div>
      <AdsUnit/>
      <TeamAnalysisSnorlaxFavorite filter={filter} setFilter={setFilter} pokemon={pokemon} {...props}/>
      <TeamAnalysisResult setup={setup} setSetup={setSetup} snorlaxFavorite={filter.snorlaxFavorite} {...props}/>
    </>
  );
};
