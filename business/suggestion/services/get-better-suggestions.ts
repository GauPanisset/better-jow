import { getSuggestionsExcludingRecentRecipes } from './get-suggestions-excluding-recent-recipes';
import { limitSuggestions } from './limit-suggestions';
import { shouldKeepLongRecipes } from './should-keep-long-recipes';
import { shouldKeepRecipes } from './should-keep-recipes';
import { sortSuggestionsByAscSimilarity } from './sort-suggestions-by-asc-similarity';

/**
 * Retrieve some recipe suggestions.
 * It implements the logic of a better suggestion system.
 */
const getBetterSuggestions = async (count: number = 5) => {
  const recipeSuggestions = await getSuggestionsExcludingRecentRecipes(
    count * 2
  );
  const sortedBySimilarityRecipeSuggestions =
    sortSuggestionsByAscSimilarity(recipeSuggestions);
  const keptRecipes = limitSuggestions(sortedBySimilarityRecipeSuggestions, [
    shouldKeepLongRecipes(count / 2),
    shouldKeepRecipes(count),
  ]);

  return keptRecipes;
};

export { getBetterSuggestions };
