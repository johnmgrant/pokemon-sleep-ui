import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonProducingRateStage} from '@/types/game/producing/rate';
import {CookingUserSettings, UserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerBasisValueAtStage, TeamMakerIntermediateRate} from '@/ui/team/maker/type/common';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamMakerCalcIntermediateOpts = TeamMakerCalcInitOpts & {
  settings: UserSettings,
  cookingSettings: CookingUserSettings,
};

export const getTeamMakerCalcIntermediate = ({
  pokeboxList,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  input,
  settings,
  cookingSettings,
}: GetTeamMakerCalcIntermediateOpts): TeamMakerIntermediateRate[] => {
  const toTeamMakerFirstPassData = (pokeInBox: PokeInBox): TeamMakerIntermediateRate | null => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
      pokemonLevel: pokeInBox.level,
      ingredientMap,
      ingredientChainMap,
    })) {
      return null;
    }

    const level = input.previewLevel ?? pokeInBox.level;
    const singleParams = getProducingRateSingleParams({
      ...pokeInBox,
      level,
      subSkillMap,
    });
    const calculatedSettings = toCalculatedUserSettings({
      settings,
      recoveryRate: toRecoveryRate(singleParams),
    });

    const calcOpts: GetPokemonProducingRateOpts = {
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      calculatedSettings,
      ...pokeInBox,
      ...singleParams,
      ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      // Override `level` because preview level might be active
      level,
      // Override `pokemon` in `pokeInBox`
      pokemon,
      // Override `ingredients` in `pokeInBox`
      ingredients: getEffectiveIngredientProductions(pokeInBox),
    };
    const rate = getPokemonProducingRateSingle({
      snorlaxFavorite: input.snorlaxFavorite,
      period: teamMakerProductionPeriod,
      cookingSettings,
      ...calcOpts,
    });

    return {
      rate,
      pokeInBox,
      calcOpts,
      basisValueAtStage: Object.fromEntries(pokemonProducingRateStage.map((stage) => [
        stage,
        getTeamMakerBasisValue({
          pokemonRate: rate.atStage[stage],
          targetMeals: cookingSettings.targetMeals,
        }),
      ])) as TeamMakerBasisValueAtStage,
    };
  };

  return pokeboxList
    .flatMap((pokeInBox): PokeInBox[] => {
      if (!input.previewFinalEvolution) {
        return [pokeInBox];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map(toTeamMakerFirstPassData)
    .filter(isNotNullish);
};
