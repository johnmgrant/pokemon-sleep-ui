import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {CookingUserSettings} from '@/types/userData/settings';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {GetProducingRateBehavior, GetProducingRateSharedOpts} from '@/utils/game/producing/type';


type GetPokemonProducingRateSingleOpts =
  GetPokemonProducingRateOpts &
  GetProducingRateSharedOpts & {
    cookingSettings: CookingUserSettings,
    calcBehavior?: GetProducingRateBehavior,
  };

export const getPokemonProducingRateSingle = ({
  calcBehavior,
  ...opts
}: GetPokemonProducingRateSingleOpts): PokemonProducingRateWithPayload<null> => {
  const rates = getPokemonProducingRateMulti({
    rateOpts: [{opts, payload: null}],
    sharedOpts: opts,
    groupingState: 'equivalent',
    calcBehavior: {
      ...calcBehavior,
      // Simulate on self by default
      simulateHelperBonusOnSelf: calcBehavior?.simulateHelperBonusOnSelf ?? true,
    },
    ...opts,
  });

  return rates.rates[0];
};
