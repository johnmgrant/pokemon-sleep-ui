import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {
  TeamAnalysisMember,
  TeamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {toTeamAnalysisMember} from '@/utils/team/toMember';


export type TeamAnalysisTeamViewProps = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  statsOfTeam: TeamProducingStats,
};

type TeamAnalysisGridItemProps = TeamAnalysisTeamViewProps & {
  slotName: TeamAnalysisSlotName,
  setMember: (
    slotName: TeamAnalysisSlotName,
    member: TeamAnalysisMember,
  ) => void,
};

export const TeamAnalysisGridItem = (props: TeamAnalysisGridItemProps) => {
  const {
    setup,
    setSetup,
    slotName,
    setMember,
    pokedexMap,
    statsOfTeam,
  } = props;

  const {members, snorlaxFavorite} = React.useMemo(() => {
    return getCurrentTeam({setup});
  }, [setup]);

  const member = members[slotName];
  const pokemon = member ? pokedexMap[member.pokemonId] : undefined;
  const stats = statsOfTeam.bySlot[slotName];

  const isAvailable = member && pokemon && stats;

  return (
    <Flex key={slotName} center className={clsx('button-bg relative gap-1.5 rounded-lg p-3')}>
      <button className={clsx(
        'absolute right-1 top-1 z-10 h-5 w-5 rounded-full',
        'enabled:button-clickable disabled:button-disabled-border',
      )}
      disabled={!member}
      onClick={() => setSetup((original) => ({
        ...original,
        comps: {
          ...original.comps,
          [original.config.current]: getCurrentTeam({
            setup: original,
            overrideSlot: slotName,
            overrideMember: null,
          }),
        },
      }))}>
        <XMarkIcon/>
      </button>
      {isAvailable ?
        <TeamAnalysisFilledSlot {...props}
          snorlaxFavorite={snorlaxFavorite}
          slotName={props.slotName}
          member={member}
          stats={stats}
          pokemon={pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap: props.pokemonProducingParamsMap,
          })}/> :
        <TeamAnalysisEmptySlot {...props}
          onPokeboxPicked={(pokeInBox) => setMember(props.slotName, toTeamAnalysisMember(pokeInBox))}
          onCloudPulled={(member) => setMember(props.slotName, member)}/>
      }
    </Flex>
  );
};
