import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
  berryName: string,
};

export const PokemonBerryProduction = ({pokemon, berryName}: Props) => {
  const {berry} = pokemon;

  return (
    <Flex direction="col" center className="gap-1">
      <Flex direction="row" center className="gap-1">
        <PokemonBerryIcon id={berry.id} dimension="h-10 w-10"/>
        <div className="whitespace-nowrap text-lg">
          {berryName} &times; {berry.quantity}
        </div>
      </Flex>
    </Flex>
  );
};
