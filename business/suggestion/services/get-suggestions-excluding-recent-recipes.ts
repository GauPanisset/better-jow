import { getRecipeIdsAfterDate } from '@/business/recipe/services/get-recipe-ids-after-date';
import { getJowClient } from '@/technical/jow/services/jow-client';

/**
 * Retrieve Jow recipe suggestions excluding the recent ones.
 * A recipe is considered recent if it was in a shopping list
 * less than 30 days ago.
 */
const getSuggestionsExcludingRecentRecipes = async (count: number) => {
  const jowClient = getJowClient();

  const recentRecipeIds = await getRecipeIdsAfterDate(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  );
  const recipeSuggestions = await jowClient.getUserRecipesRecommendations(
    recentRecipeIds,
    count
  );

  return recipeSuggestions;
};

export { getSuggestionsExcludingRecentRecipes };
