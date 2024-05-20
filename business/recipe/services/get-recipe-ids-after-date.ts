import { getJowClient } from '@/technical/jow/services/jow-client';

/**
 * Retrieve the recipe ids found in at least one user shopping list
 * created after the given date.
 */
const getRecipeIdsAfterDate = async (date: Date) => {
  const jowClient = getJowClient();
  const shoppingLists = await jowClient.getUserShoppingLists();
  const recentShoppingLists = shoppingLists.filter(
    (shoppingList) => shoppingList.creationDate.getTime() >= date.getTime()
  );

  const recentRecipeIds = [
    ...new Set(
      recentShoppingLists.flatMap((shoppingList) =>
        shoppingList.meals.map((meal) => meal.recipe)
      )
    ),
  ];

  return recentRecipeIds;
};

export { getRecipeIdsAfterDate };
