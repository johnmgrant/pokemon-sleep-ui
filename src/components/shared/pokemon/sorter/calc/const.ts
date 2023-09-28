import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {defaultHelperCount, defaultSubSkillBonus} from '@/const/game/production';
import {getEquivalentFrequencyFromPokemonRate} from '@/utils/game/producing/frequency';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'friendshipPoint',
];

export const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  level: ({level}) => level,
  dateAdded: ({dateAdded}) => dateAdded ?? 0,
  ingredientEnergy: (opts) => getIngredientTotalRateSorter({key: 'dailyEnergy', opts}),
  ingredientCount: (opts) => getIngredientTotalRateSorter({key: 'quantity', opts}),
  ingredientRate: ({pokemonProducingParams}) => pokemonProducingParams.ingredientSplit,
  berryEnergy: (opts) => getBerryRateSorter({key: 'dailyEnergy', opts}),
  berryCount: (opts) => getBerryRateSorter({key: 'quantity', opts}),
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  frequencyBase: ({pokemon}) => pokemon.stats.frequency,
  frequency: ({helperCount, subSkillBonus, calculatedSettings, ...opts}) => (
    getEquivalentFrequencyFromPokemonRate(getPokemonProducingRate({
      helperCount: helperCount ?? defaultHelperCount,
      subSkillBonus: subSkillBonus ?? defaultSubSkillBonus,
      ...calculatedSettings,
      ...opts,
    }))
  ),
  frequencyOfBerry: (opts) => getBerryRateSorter({key: 'frequency', opts}),
  frequencyOfIngredient: (opts) => getIngredientFirstRateSorter({key: 'frequency', opts}),
  totalEnergy: (opts) => {
    const berry = getBerryRateSorter({key: 'dailyEnergy', opts});
    const ingredient = getIngredientTotalRateSorter({key: 'dailyEnergy', opts});

    return berry + ingredient;
  },
};
