import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageGallerySizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonDataIcon} from '@/ui/pokedex/page/dataIcon';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonSleepStyles = ({pokemon, sleepStyles}: PokemonProps) => {
  const t = useTranslations('Game.Field');
  const t2 = useTranslations('UI.Common');
  const t3 = useTranslations(`Game.SleepFace.${pokemon.id}`);
  const t4 = useTranslations('Game.SleepFace.onSnorlax');
  const t5 = useTranslations('UI.InPage.Pokedex.Info');

  if (sleepStyles.length === 0) {
    return <></>;
  }

  return (
    <Flex direction="col" center className="info-section-md-fit">
      {sleepStyles.map(({mapId, styles}) => {
        const mapName = t(mapId.toString());

        return (
          <Flex key={mapId} direction="col" className="relative p-1.5">
            <NextImage
              src={`/images/field/${mapId}.png`} alt={mapName}
              sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
            />
            <Flex direction="row" center className="z-10 p-1.5">
              <div>
                <div className="relative h-9 w-9">
                  <NextImage src="/images/generic/map_pin.png" alt={t5('Map')} sizes={imageSmallIconSizes}/>
                </div>
              </div>
              <div className="text-lg">
                {mapName}
              </div>
            </Flex>
            <Flex direction="row" center wrap className="z-10 gap-1">
              {styles.map(({rank, style, rewards}) => (
                <Flex key={style} direction="col" center className="gap-1 p-2.5" noFullWidth>
                  <div className="text-slate-500">
                    {style === 'onSnorlax' ? t4('Default') : t3(style.toString())}
                  </div>
                  <SnorlaxRankUI rank={rank}/>
                  <Flex direction="row" center>
                    <div>
                      <PokemonDataIcon src="/images/generic/gift.png" alt={t2('Rewards')} invert/>
                    </div>
                    <div>
                      <table className="border-separate border-spacing-0.5">
                        <tbody>
                          <tr>
                            <td><PokemonDataIcon src="/images/generic/research.png" alt={t2('Exp')}/></td>
                            <td>{rewards.exp}</td>
                          </tr>
                          <tr>
                            <td><PokemonDataIcon src="/images/generic/shard.png" alt={t2('DreamShards')}/></td>
                            <td>{rewards.shards}</td>
                          </tr>
                          <tr>
                            <td><PokemonDataIcon src="/images/generic/candy.png" alt={t2('Candy')}/></td>
                            <td>{rewards.candy}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
