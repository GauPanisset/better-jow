import { z } from 'zod';

const shoppingListSchema = z.object({
  _id: z.string(),
  creationDate: z.coerce.date(),
  validationDate: z.coerce.date(),
  meals: z.array(
    z.object({
      _id: z.string(),
      recipe: z.string(),
    })
  ),
});

type ShoppingList = z.infer<typeof shoppingListSchema>;

export { shoppingListSchema };
export type { ShoppingList };
