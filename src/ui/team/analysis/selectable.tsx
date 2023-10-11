import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {
  TeamAnalysisMember,
  TeamAnalysisComp,
  teamAnalysisSlotName,
  TeamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type Props = TeamAnalysisDataProps & {
  team: TeamAnalysisComp,
  setMember: (slot: TeamAnalysisSlotName, member: TeamAnalysisMember) => void,
  isIncluded: FilterInclusionMap<PokemonId>,
  pokemonList: PokemonInfo[],
};

export const TeamAnalysisSelectablePokemon = ({
  team,
  setMember,
  isIncluded,
  pokemonList,
  ingredientChainMap,
}: Props) => {
  const putOnTeam = (pokemon: PokemonInfo) => {
    let slotToInsert: TeamAnalysisSlotName | null = null;

    for (const slotName of teamAnalysisSlotName) {
      if (team.members[slotName]) {
        continue;
      }
      slotToInsert = slotName;
      break;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];

    setMember(
      slotToInsert ?? 'E',
      {
        pokemonId: pokemon.id,
        level: 1,
        nature: null,
        subSkill: {},
        ingredients: generateIngredientProductionAtLevels(chain),
        evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
      },
    );
  };

  return (
    <PokemonClickableIcons
      pokemonList={pokemonList.filter(({id}) => isIncluded[id])}
      onClick={putOnTeam}
    />
  );
};
