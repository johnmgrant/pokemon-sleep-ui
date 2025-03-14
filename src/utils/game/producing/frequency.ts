import {durationOfDay} from '@/const/common';
import {goodCampTicketBonus} from '@/const/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {PokemonProducingRate, ProducingValueOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {UserCalculationBehavior} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {roundDown} from '@/utils/number/round';


type GetBaseFrequencyOpts = {
  level: number,
  frequency: PokemonInfo['stats']['frequency'],
  natureId: NatureId | null,
  subSkillBonusRates: number[],
  helperCount: number,
  behavior: UserCalculationBehavior,
  noCap?: boolean,
};

const getBaseFrequency = ({
  level,
  frequency,
  natureId,
  subSkillBonusRates,
  helperCount,
  behavior,
  noCap,
}: GetBaseFrequencyOpts) => {
  let bonus = (1 - (level - 1) * 0.002);
  bonus *= getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});
  // https://x.com/emuptea/status/1711238322780266825
  // 0.35 is the mandatory cap from the officials
  // -- No Cap is used in rating, because rating applies 5 stacks of helper count, which won't really happen in game
  bonus *= (1 - Math.min(noCap ? Infinity : 0.35, toSum(subSkillBonusRates) / 100 + 0.05 * helperCount));

  if (behavior.goodCampTicket) {
    bonus /= goodCampTicketBonus.frequencyDivisor;
  }

  bonus = roundDown({value: bonus, decimals: 4});

  return roundDown({value: frequency * bonus, decimals: 0});
};

export type GetFrequencyFromPokemonOpts = Pick<
  GetBaseFrequencyOpts,
  'behavior' | 'helperCount' | 'natureId' | 'noCap'
> & {
  level: number,
  subSkillBonus: GroupedSubSkillBonus,
  pokemon: PokemonInfo,
};

export const getBaseFrequencyFromPokemon = ({
  subSkillBonus,
  pokemon,
  ...opts
}: GetFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;

  return getBaseFrequency({
    frequency: stats.frequency,
    subSkillBonusRates: getSubSkillBonusValue(subSkillBonus, 'frequency'),
    ...opts,
  });
};

type GetFrequencyFromItemRateOfSessionsOpts = Omit<GetSpecificItemRateOfSessionCommonOpts, 'period'>;

export const getFrequencyFromItemRateOfSessions = ({
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
}: GetFrequencyFromItemRateOfSessionsOpts): ProducingValueOfStates => {
  const multiplier = 1 / produceItemSplit;

  const awake = multiplier * rate.awake.frequency;
  const sleepVacant = multiplier * rate.sleep.frequency;
  const sleepFilled = produceType === 'berry' ? rate.sleep.frequency : Infinity;

  const unfilledOnlyDivisor = (
    sleepStateSplit.awake / awake +
    sleepStateSplit.sleepVacant / sleepVacant
  );

  const unfilledOnly = 1 / unfilledOnlyDivisor;
  const equivalent = 1 / (unfilledOnlyDivisor + sleepStateSplit.sleepFilled / sleepFilled);

  return {awake, sleepVacant, sleepFilled, equivalent, unfilledOnly};
};

type GetHelpingCountFromPokemonRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const getDailyHelpsOfStateFromPokemonRate = ({rate, state}: GetHelpingCountFromPokemonRateOpts) => {
  const {berry, ingredient} = rate;

  return durationOfDay * (
    1 / berry.frequency[state] +
    toSum(Object.values(ingredient).map(({frequency}) => 1 / frequency[state]))
  );
};

export const getFrequencyOfStateFromPokemonRate = (opts: GetHelpingCountFromPokemonRateOpts) => {
  return durationOfDay / getDailyHelpsOfStateFromPokemonRate(opts);
};
