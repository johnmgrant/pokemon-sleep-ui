import React from 'react';

import {Meal} from '@/types/game/meal/main';
import {getMealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/ofType';
import {MealPreparerInfo} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


type UseMealPreparerInfoOfMealTypeOpts = MealPreparerCommonProps & {
  meals: Meal[],
};

export const useMealPreparerInfo = ({
  meals,
  mealTypes,
  ...props
}: UseMealPreparerInfoOfMealTypeOpts): MealPreparerInfo => {
  const {
    filter,
    calculatedSettings,
    ingredientMap,
  } = props;
  const {mealsWanted, recipeLevel} = filter;

  return React.useMemo(
    (): MealPreparerInfo => Object.fromEntries(mealTypes.map((mealType) => [
      mealType,
      getMealPreparerInfoOfMealType({
        ...props,
        mealsOfType: meals.filter(({type, ingredients}) => type === mealType && !!ingredients.length),
      }),
    ])),
    [mealsWanted, recipeLevel, calculatedSettings, meals, ingredientMap],
  );
};
