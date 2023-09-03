import {runUserSettingsMigrations} from '@/controller/migrate/userSettings';
import {
  userDataIngredientCount,
  userDataMealType,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataPotCapacity,
  userDataRecipeLevel,
  userDataSettings,
} from '@/controller/user/manager';
import {UserPreloadedData} from '@/types/userData/main';


export const getUserPreloadedData = async (userId: string): Promise<UserPreloadedData> => {
  await runUserSettingsMigrations(userId);

  const [
    mealType,
    recipeLevel,
    pokedex,
    pokeboxDisplay,
    potCapacity,
    ingredientCount,
    settings,
  ] = await Promise.all([
    userDataMealType.getData(userId),
    userDataRecipeLevel.getData(userId),
    userDataPokedex.getData(userId),
    userDataPokeboxDisplay.getData(userId),
    userDataPotCapacity.getData(userId),
    userDataIngredientCount.getData(userId),
    userDataSettings.getData(userId),
  ]);

  return {
    mealType: mealType?.data,
    recipeLevel: recipeLevel?.data,
    pokedex: pokedex?.data,
    pokeboxDisplay: pokeboxDisplay?.data,
    potCapacity: potCapacity?.data,
    ingredientCount: ingredientCount?.data,
    settings: settings?.data,
  };
};
