import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/input/utils';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';
import {PokedexDisplay, PokedexFilter} from '@/ui/pokedex/index/type';
import {migrate} from '@/utils/migrate/main';
import {pokedexMigrators} from '@/utils/migrate/pokedex/migrators';
import {PokedexFilterMigrateParams} from '@/utils/migrate/pokedex/type';


const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequency',
  'frequencyOfIngredient',
  'timeToFullPack',
  'totalEnergy',
];

const exhaustIngredientCombinationsIfDisplay: PokedexDisplayType[] = [
  ...exhaustIngredientCombinationsIfSort,
  'ingredient',
];

export const toCalculateAllIngredientPossibilities = ({display, sort}: PokedexFilter): boolean => {
  return (
    exhaustIngredientCombinationsIfSort.includes(sort) ||
    exhaustIngredientCombinationsIfDisplay.includes(display)
  );
};

export const generateInitialFilter = (preloadedDisplay: Partial<PokedexDisplay> | undefined): PokedexFilter => {
  return migrate<PokedexFilter, PokedexFilterMigrateParams>({
    original: {
      name: '',
      sort: 'id',
      display: 'mainSkill',
      ...generatePokemonInputFilterExtended(),
      version: 1,
    },
    override: preloadedDisplay ?? null,
    migrators: pokedexMigrators,
    migrateParams: {},
  });
};
