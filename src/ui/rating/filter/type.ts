import {PokemonInputFilterExtended} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {RatingDataProps} from '@/ui/rating/type';


export type RatingFilter = PokemonInputFilterExtended;

export type RatingFilterOnSelectOpts = {
  pokemon: PokemonInfo,
} & ({
  origin: 'pokedex',
  ingredients?: never,
  subSkill?: never,
  nature?: never,
} | {
  origin: 'ocr',
  ingredients?: never,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
} | {
  origin: 'pokebox',
  ingredients?: IngredientProductionAtLevels,
  subSkill?: PokemonSubSkill,
  nature?: NatureId | null,
});

export type RatingFilterCommonProps = RatingDataProps & {
  onPokemonPicked: (opts: RatingFilterOnSelectOpts) => void,
};
