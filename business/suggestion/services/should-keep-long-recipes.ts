import { computeRecipeTime } from '@/business/recipe/services/compute-recipe-time';
import { Recipe } from '@/technical/jow/model/recipe';

import { ShouldKeepFunction } from './limit-suggestions';

const isLongRecipe = (recipe: Recipe) => {
  return computeRecipeTime(recipe) > 30;
};

/**
 * Return true if the long recipe should be kept, false otherwise.
 * It limits on the number of long recipes to keep.
 */
const shouldKeepLongRecipes =
  (limit: number): ShouldKeepFunction =>
  (keptRecipes, recipeSuggestion) => {
    if (isLongRecipe(recipeSuggestion)) {
      if (keptRecipes.filter(isLongRecipe).length < limit) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

export { shouldKeepLongRecipes };
