import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';

import { Recipe, recipeSchema } from '../model/recipe';
import { ShoppingList, shoppingListSchema } from '../model/shopping-list';
import { JowStoreManager } from './jow-store-manager';

class JowClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly storeManager = new JowStoreManager();

  constructor() {
    const authToken = this.storeManager.getItem<string>('auth.accessToken');

    this.axiosInstance = axios.create({
      baseURL: 'https://api.jow.fr/public',
      withCredentials: true,
      headers: {
        common: {
          Authorization: `Bearer ${authToken}`,
          'X-Jow-Referrer': 'https://jow.fr/grocery/menu',
          'X-Jow-Web-Version': '8.14.3',
          'X-Jow-Withmeta': '1',
        },
      },
    });
  }

  /**
   * Retrieve the shopping lists of the connected user.
   */
  async getUserShoppingLists(): Promise<ShoppingList[]> {
    const response = await this.axiosInstance.get(
      '/shoppinglists/validated?count=10&start=0'
    );

    return z.array(shoppingListSchema).parse(response.data.data);
  }

  /**
   * Retrieve recipes recommended by Jow based on the connected
   * user preferences.
   */
  async getUserRecipesRecommendations(
    excludedRecipeIds: Recipe['_id'][] = [],
    count: number = 5
  ): Promise<Recipe[]> {
    const response = await this.axiosInstance.post(
      `/recipes/reco/more?count=${count}&availabilityZoneId=FR&withDetails=true`,
      { excludedRecipesIds: excludedRecipeIds }
    );

    return z.array(recipeSchema).parse(response.data.data);
  }

  /**
   * Create a shopping list
   */
  async createShoppingList(recipes: Recipe[]): Promise<Recipe[]> {
    const response = await this.axiosInstance.post(`/shoppinglist/open`, {
      meals: recipes.map((recipe) => ({
        recipe: recipe.id,
        coversCount: Math.max(2, recipe.minimumCoversRequired ?? 0),
        source: recipe.source ?? 'jow',
      })),
    });

    return z
      .object({
        meals: z.array(
          z.object({
            recipe: recipeSchema,
          })
        ),
      })
      .parse(response.data.data)
      .meals.map((meal) => meal.recipe);
  }
}

let singleJowClient: JowClient | null = null;

const getJowClient = () => {
  if (!singleJowClient) {
    singleJowClient = new JowClient();
  }
  return singleJowClient;
};

export { getJowClient };
