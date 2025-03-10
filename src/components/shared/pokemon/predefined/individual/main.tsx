import React from 'react';

import {clsx} from 'clsx';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonIndividualParamsInput} from '@/components/shared/pokemon/predefined/individual/type';
import {PokemonIndividualSelectorButtonProps} from '@/components/shared/pokemon/selector/type';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props = FilterInputProps<PokemonIndividualParamsInput> & {
  maxLevel: number,
  isPremium: boolean,
  subSkillMap: SubSkillMap,
  className?: string,
};

export const PokemonIndividualParamsPicker = ({
  filter,
  setFilter,
  maxLevel,
  isPremium,
  subSkillMap,
  className,
}: Props) => {
  const selectorProps: PokemonIndividualSelectorButtonProps = {
    classNameForHeight: 'h-8',
    isPremium,
    requirePremium: true,
  };

  return (
    <Flex className={clsx('gap-1.5', className)}>
      <PokemonLevelSlider
        value={filter.level}
        setValue={(level) => setFilter((original): PokemonIndividualParamsInput => ({
          ...original,
          level,
        }))}
        max={maxLevel}
        noSameLine
      />
      <Flex className="gap-1.5 sm:flex-row">
        <PokemonSubSkillSelector
          subSkill={filter.subSkill}
          setSubSkill={(subSkill) => setFilter((original): PokemonIndividualParamsInput => ({
            ...original,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
          {...selectorProps}
        />
        <PokemonNatureSelector
          nature={filter.nature}
          setNature={(nature) => setFilter((original): PokemonIndividualParamsInput => ({
            ...original,
            nature,
          }))}
          {...selectorProps}
        />
      </Flex>
    </Flex>
  );
};
