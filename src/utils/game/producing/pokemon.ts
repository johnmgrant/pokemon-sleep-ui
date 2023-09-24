import {defaultHelperCount, defaultProducingParams} from '@/const/game/production';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {
  getCarryLimitFromPokemonInfo,
  getFullPackRatioInSleep,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredients';
import {getTotalRateOfItemOfSessions} from '@/utils/game/producing/rateReducer';
import {getProduceSplit} from '@/utils/game/producing/split';


type GetPokemonProducingRateOpts =
  Omit<GetBerryProducingRateOpts, 'frequency'> &
  Omit<GetIngredientProducingRatesOpts, 'frequency'> &
  ProducingRateSingleParams & {
    carryLimit?: number,
    pokemonProducingParams: PokemonProducingParams,
    sleepDurations: number[],
  };

export const getPokemonProducingRate = ({
  carryLimit,
  sleepDurations,
  ...opts
}: GetPokemonProducingRateOpts): PokemonProducingRate => {
  const {pokemon, helperCount, subSkillBonus} = opts;
  const sleepDuration = toSum(sleepDurations);

  const frequency = getFrequencyFromPokemon({
    ...opts,
    subSkillBonus: subSkillBonus ?? {},
    helperCount: helperCount ?? defaultHelperCount,
  });

  const berry = getBerryProducingRate({
    frequency,
    ...opts,
  });
  const ingredient = getIngredientProducingRates({
    frequency,
    ...opts,
  });

  const produceSplit = getProduceSplit(opts);
  const fullPackRatioInSleep = getFullPackRatioInSleep({
    carryLimit: carryLimit ?? getCarryLimitFromPokemonInfo({pokemon}),
    dailyCount: getTheoreticalDailyQuantityInSleep({
      rate: {berry, ingredient},
      produceSplit,
    }),
    sleepDurations: sleepDurations,
  });

  return {
    berry: getTotalRateOfItemOfSessions({
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepDuration,
      fullPackRatioInSleep,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getTotalRateOfItemOfSessions({
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepDuration,
        fullPackRatioInSleep,
        ...opts,
      }),
    ])),
  };
};

type GetPokemonProducingParamsOpts = {
  pokemonId: PokemonId,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};

export const getPokemonProducingParams = ({
  pokemonId,
  pokemonProducingParamsMap,
}: GetPokemonProducingParamsOpts): PokemonProducingParams => {
  return pokemonProducingParamsMap[pokemonId] ?? {pokemonId, ...defaultProducingParams};
};
