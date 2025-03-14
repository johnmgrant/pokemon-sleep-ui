import React from 'react';

import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
};

export const PokemonLinkPopupContent = ({pokemon}: Props) => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  const {id, sleepType, specialty} = pokemon;

  const name = t2(`PokemonName.${id}`);

  return (
    <Flex center className="gap-1.5 md:w-96">
      <PokemonNameBig pokemon={pokemon}/>
      <Flex direction="row" center className="gap-1">
        <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-5 w-5"/>
        <PokemonSpecialtyIcon specialty={specialty} dimension="h-5 w-5"/>
      </Flex>
      <div className="relative h-60 w-60">
        <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
      </div>
      <Flex direction="row" className="gap-2">
        <Flex>
          <Link href={`/pokedex/${id}`}>
            <Flex center className="button-clickable-bg group p-2">
              <GenericPokeballIcon dimension="h-10 w-10" alt={t('Pokedex.Page.Title', {name})}/>
            </Flex>
          </Link>
        </Flex>
        <Flex>
          <Link href={`/analysis/${id}`}>
            <Flex center className="button-clickable-bg group p-2">
              <div className="relative h-10 w-10">
                <NextImage
                  src="/images/generic/analysis.png" alt={t('Analysis.Title', {name})}
                  sizes={imageIconSizes} className="invert-hoverable"
                />
              </div>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
