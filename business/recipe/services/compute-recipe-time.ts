import { Recipe } from '@/technical/jow/model/recipe';

/**
 * Compute the recipe total time (preparation and cooking time)
 */
const computeRecipeTime = (recipe: Recipe) => {
  return (recipe.cookingTime ?? 0) + (recipe.preparationTime ?? 0);
};

export { computeRecipeTime };
