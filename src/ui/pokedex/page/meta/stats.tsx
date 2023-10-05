import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonStats = ({pokemon}: PokemonProps) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.Common');
  const {stats} = pokemon;

  return (
    <table className="border-separate border-spacing-1">
      <tbody>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/friendship.png" alt={t('Stats.Friendship')} noInvert/>
          </td>
          <td>
            {stats.friendshipPoints}
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/clock.png" alt={t('Stats.FrequencyBase')}/>
          </td>
          <td>
            <PokemonFrequency frequency={stats.frequency} noIcon normalText/>
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/bag.png" alt={t2('MaxCarry')}/>
          </td>
          <td>
            {stats.maxCarry}
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/pokemonbox.png" alt={t('Stats.Recruit')}/>
          </td>
          <td>
            <table className="mx-4 border-separate border-spacing-0.5">
              <tbody>
                <tr>
                  <td>
                    <GenericIconLarger src="/images/generic/research.png" alt={t2('Exp')} noInvert/>
                  </td>
                  <td>
                    {stats.recruit.exp}
                  </td>
                </tr>
                <tr>
                  <td>
                    <GenericIconLarger src="/images/generic/shard.png" alt={t2('DreamShards')} noInvert/>
                  </td>
                  <td>
                    {stats.recruit.shards}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
