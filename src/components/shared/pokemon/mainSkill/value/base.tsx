import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/common';
import {formatFloat} from '@/utils/number';


type Props = {
  value: number,
};

export const PokemonMainSkillValue = ({value}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <MainSkillIcon alt={t('MainSkillValue')}/>
      <div>{formatFloat(value)}</div>
    </Flex>
  );
};
