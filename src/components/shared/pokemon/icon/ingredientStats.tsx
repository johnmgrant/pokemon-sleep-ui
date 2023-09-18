import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {EffectiveBonus} from '@/types/game/bonus';
import {Ingredient} from '@/types/game/ingredient';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  ingredient: Ingredient | undefined,
  bonus: EffectiveBonus,
};

export const PokemonIconsIngredientStats = ({
  level,
  ingredient,
  pokemonProducingParamsMap,
  bonus,
  ...props
}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.ingredient}
      getProducingRate={(pokemon, qty) => getIngredientProducingRate({
        level,
        pokemon,
        pokemonProducingParams: getPokemonProducingParams({
          pokemonId: pokemon.id,
          pokemonProducingParamsMap,
        }),
        ...defaultNeutralOpts,
        ingredient,
        bonus,
        count: qty,
        picks: getEffectiveIngredientLevels(level).length,
      })}
      getIcon={() => (
        <NextImage
          src={`/images/ingredient/${ingredient.id}.png`}
          alt={t(`Food.${ingredient.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      {...props}
    />
  );
};
