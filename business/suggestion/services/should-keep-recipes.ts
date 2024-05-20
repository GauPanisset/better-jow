import { ShouldKeepFunction } from './limit-suggestions';

/**
 * Return true if the recipe should be kept, false otherwise.
 * It limits the global number of recipes.
 */
const shouldKeepRecipes =
  (limit: number): ShouldKeepFunction =>
  (keptRecipes) => {
    return keptRecipes.length < limit;
  };

export { shouldKeepRecipes };
