import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {SleepdexMap} from '@/types/game/sleepdex';
import {PokemonSleepStylesIncenseOnly} from '@/ui/pokedex/page/sleepStyle/incenseOnly';
import {PokemonSleepStylesOfMap} from '@/ui/pokedex/page/sleepStyle/map';
import {PokemonDataCommonProps} from '@/ui/pokedex/page/type';
import {toUnique} from '@/utils/array';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props = PokemonDataCommonProps & {
  initialSleepdex: SleepdexMap,
};

export const PokemonSleepStylesLoaded = ({
  pokemon,
  pokemonBranches,
  sleepStyles,
  sleepStylesSpecial,
  snorlaxDataMap,
  translatedSettings,
  initialSleepdex,
}: Props) => {
  const [sleepdex, setSleepdex] = React.useState(initialSleepdex);
  const t = useTranslations('UI.SleepStyle');

  if (!sleepStyles.length) {
    return null;
  }

  const availableSleepStyles = toUnique([
    ...sleepStyles.flatMap((sleepStyleNormal) => (
      sleepStyleNormal.styles.map((sleepStyle) => (
        sleepStyle.style
      ))
    )),
    ...sleepStylesSpecial.map((sleepStyleSpecial) => (
      sleepStyleSpecial.style
    )),
  ]);

  const unlockedSleepStyles = availableSleepStyles.reduce<number>((unlockedSleepStyles, current) => {
    if (isInSleepdex({sleepdex, pokemonId: pokemon.id, styleId: current})) {
      return unlockedSleepStyles + 1;
    }

    return unlockedSleepStyles;
  }, 0);

  return (
    <Flex center wrap className="info-section md:flex-row">
      {sleepStyles.map((sleepStyleOfMap) => (
        <PokemonSleepStylesOfMap
          key={sleepStyleOfMap.mapId}
          sleepdex={sleepdex}
          setSleepdex={setSleepdex}
          pokemon={pokemon}
          pokemonBranch={pokemonBranches}
          calculatedSettings={translatedSettings.calculatedSettings}
          snorlaxData={snorlaxDataMap[sleepStyleOfMap.mapId]}
          sleepStyleOfMap={sleepStyleOfMap}
        />
      ))}
      <PokemonSleepStylesIncenseOnly
        pokemon={pokemon}
        pokemonBranch={pokemonBranches}
        sleepdex={sleepdex}
        setSleepdex={setSleepdex}
        sleepStylesIncenseOnly={sleepStylesSpecial}
      />
      <Flex direction="row" center className="justify-end">
        <CompletionResultUI
          completed={unlockedSleepStyles}
          total={availableSleepStyles.length}
        />
      </Flex>
      <Flex className="info-highlight p-1">
        {t('Message.UnlockRankDiffers')}
      </Flex>
    </Flex>
  );
};
