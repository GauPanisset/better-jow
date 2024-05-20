import { computeRecipesSimilarity } from '@/business/recipe/services/compute-recipes-similarity';
import { Recipe } from '@/technical/jow/model/recipe';

/**
 * Sort the recipe suggestions by similarity in a ascending order.
 */
const sortSuggestionsByAscSimilarity = (recipeSuggestions: Recipe[]) => {
  const similarities = recipeSuggestions.map((recipeSuggestion) => {
    return {
      recipe: recipeSuggestion,
      similarity: recipeSuggestions.reduce((sum, otherRecipeSuggestion) => {
        return (
          sum +
          (recipeSuggestion._id !== otherRecipeSuggestion._id
            ? computeRecipesSimilarity(recipeSuggestion, otherRecipeSuggestion)
            : 0)
        );
      }, 0),
    };
  });

  const sortedBySimilarityRecipeSuggestions = similarities
    .sort((recipeSimilarityA, recipeSimilarityB) => {
      return recipeSimilarityA.similarity - recipeSimilarityB.similarity;
    })
    .map((recipeSimilarity) => recipeSimilarity.recipe);

  return sortedBySimilarityRecipeSuggestions;
};

export { sortSuggestionsByAscSimilarity };
