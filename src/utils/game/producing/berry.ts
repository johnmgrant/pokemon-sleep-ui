import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {BerryData} from '@/types/mongo/berry';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultBerryProbability, defaultHelperCount, defaultLevel} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRate} from '@/utils/game/producing/rate';
import {GetProducingRateCommonOpts} from '@/utils/game/producing/type';


export type GetBerryProducingRateOpts = GetProducingRateCommonOpts & {
  isSnorlaxFavorite: boolean,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  isSnorlaxFavorite,
  berryData,
}: GetBerryProducingRateOpts): ProducingRateOfItem => {
  const baseFrequency = getFrequencyFromPokemon({
    level,
    pokemon,
    subSkillBonus: subSkillBonus ?? {},
    helperCount: helperCount ?? defaultHelperCount,
    natureId,
  });

  const probability = defaultBerryProbability - (subSkillBonus?.ingredientProbability ?? 0);
  const ingredientNatureMultiplier = getNatureMultiplier({id: natureId, effect: 'frequencyOfIngredient'});

  let countPerHelp = pokemon.berry.quantity + (subSkillBonus?.berryCount ?? 0);
  if (isSnorlaxFavorite) {
    countPerHelp *= 2;
  }

  return {
    id: pokemon.berry.id,
    ...getProducingRate({
      frequency: baseFrequency / (probability - (1 - ingredientNatureMultiplier)),
      countPerHelp,
      energyPerCount: berryData.energy[(level ?? defaultLevel) - 1].energy,
    }),
  };
};
