import { Recipe } from '@/technical/jow/model/recipe';

type ShouldKeepFunction = (
  keptRecipes: Recipe[],
  recipeSuggestion: Recipe
) => boolean;

/**
 * Helper function to limit the number of suggestions.
 * It keeps only the suggestions that satisfy all the functions
 * given in the second argument.
 */
const limitSuggestions = (
  recipeSuggestions: Recipe[],
  shouldKeepFunctions: ShouldKeepFunction[]
) => {
  const keptRecipes: Recipe[] = [];

  for (const recipeSuggestion of recipeSuggestions) {
    if (
      shouldKeepFunctions.every((shouldKeep) =>
        shouldKeep(keptRecipes, recipeSuggestion)
      )
    ) {
      keptRecipes.push(recipeSuggestion);
    }
  }

  return keptRecipes;
};

export { limitSuggestions };
export type { ShouldKeepFunction };
