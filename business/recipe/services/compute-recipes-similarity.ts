import { Recipe } from '@/technical/jow/model/recipe';

/**
 * Compute the similarity between recipes.
 * It is basically the number of common ingredients.
 */
const computeRecipesSimilarity = (recipeA: Recipe, recipeB: Recipe): number => {
  const constituentsA = new Set(
    recipeA?.constituents?.map((constituent) => constituent.ingredient._id)
  );
  const constituentsB = new Set(
    recipeB?.constituents?.map((constituent) => constituent.ingredient._id)
  );

  const commonIngredients = new Set(
    Array.from(constituentsA).filter((constituentA) =>
      constituentsB.has(constituentA)
    )
  );

  return commonIngredients.size;
};

export { computeRecipesSimilarity };
