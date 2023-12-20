import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getSimulateHelperBonusOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


export const getRatingValueOfBase = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    level,
    basis,
    pokemon,
    subSkillMap,
    mealMap,
    bundle,
  } = opts;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill: {},
    nature: null,
    subSkillMap,
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
      ...singleParams,
      ...toTranslatedSettings({
        ...bundle,
        mealMap,
        recoveryRate: toRecoveryRate(singleParams),
      }),
      noCap: ratingCalculationNoCap,
      calcBehavior: {
        simulateHelperBonusOnSelf: getSimulateHelperBonusOnSelf(basis),
      },
    }).atStage.final,
    singleParams,
  });
};
