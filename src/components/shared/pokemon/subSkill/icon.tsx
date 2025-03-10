import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSubSkillUiProps} from '@/components/shared/pokemon/subSkill/type';
import {subSkillBonusImageSrcMap, subSkillImageOverride} from '@/const/game/pokemon';
import {subSkillRarityIconFilter} from '@/styles/game/subSkill';
import {imageSmallIconSizes} from '@/styles/image';
import {SubSkillBonusCategory} from '@/types/game/pokemon/subSkill';


export const PokemonSubSkillIcon = ({subSkill, isInactive}: PokemonSubSkillUiProps) => {
  const t = useTranslations('Game');

  const opacity = isInactive && 'opacity-40';

  if (!subSkill) {
    return <XCircleIcon className={clsx('h-6 w-6', opacity)}/>;
  }

  const firstEffectiveBonus = Object.entries(subSkill?.bonus ?? {})
    .filter(([_, value]) => value != 0)
    .map(([key]) => key as SubSkillBonusCategory)
    .at(0);

  if (!firstEffectiveBonus) {
    return <QuestionMarkCircleIcon className={clsx('h-6 w-6', opacity)}/>;
  }

  return (
    <div className={clsx(
      'relative h-6 w-6',
      subSkill.rarity && subSkillRarityIconFilter[subSkill.rarity],
      opacity,
    )}>
      <NextImage
        src={subSkillImageOverride[subSkill.id] ?? subSkillBonusImageSrcMap[firstEffectiveBonus]}
        alt={t(`SubSkill.Name.${subSkill.id}`)}
        sizes={imageSmallIconSizes}
      />
    </div>
  );
};
