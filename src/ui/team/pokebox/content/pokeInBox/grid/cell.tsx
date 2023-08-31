import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {imageIconSizes} from '@/styles/image';
import {PokeInBoxDetails} from '@/ui/team/pokebox/content/pokeInBox/grid/details/main';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxContentPokeInBoxCell = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
    onClick,
  } = props;
  const {pokemon: pokemonId} = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata.Pokedex');

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  if (!pokemon) {
    return <></>;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  return (
    <div className="group relative w-full">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button
        className="button-clickable absolute left-1 top-1 z-20 h-6 w-6 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t2('Page.Title', {name: pokemonName})} noWrap/>
      </button>
      <button onClick={onClick} className="button-clickable-bg w-full rounded-lg p-2">
        <Flex direction="row" className="relative h-24 gap-2">
          <div className="absolute bottom-0 right-0">
            <div className="relative h-16 w-16 opacity-50">
              <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
            </div>
          </div>
          <Flex direction="col" className="z-10 gap-1">
            <PokeInBoxMeta {...pokeInBoxProps}/>
            <div className="mt-auto">
              <PokeInBoxDetails {...pokeInBoxProps}/>
            </div>
          </Flex>
        </Flex>
      </button>
    </div>
  );
};
