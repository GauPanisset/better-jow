import { z } from 'zod';

const abbreviationSchema = z.object({
  label: z.string(),
  digits: z.number(),
  divisor: z.number(),
  inverse: z.boolean(),
  _id: z.string(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  id: z.string(),
});

const measurementSystemCompatibilitySchema = z.object({
  metric: z.boolean(),
  imperial: z.boolean(),
  us: z.boolean(),
});

const unitSchema = z.object({
  _id: z.string(),
  id: z.string().optional(),
  name: z.string(),
  isNatural: z.boolean().optional(),
  measurementSystemCompatibility:
    measurementSystemCompatibilitySchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  comments: z.string().optional(),
  __v: z.number().optional(),
  abbreviations: z.array(abbreviationSchema).optional(),
});

const alternativeUnitSchema = z.object({
  _id: z.string().optional(),
  unit: unitSchema,
  quantity: z.number(),
  id: z.string().optional(),
});

const ingredientSchema = z.object({
  _id: z.string(),
  id: z.string(),
  alternativeUnits: z.array(alternativeUnitSchema).optional(),
  imageUrl: z.string(),
  name: z.string(),
  naturalUnit: unitSchema.optional(),
  quantityPerCover: z.number().optional(),
});

const alternativeIngredientSchema = z.object({
  ingredient: ingredientSchema,
});

const requiredToolsSchema = z.object({
  _id: z.string(),
  id: z.string().optional(),
  availabilityZones: z.array(z.string()),
  childrenTools: z.array(z.unknown()).default([]),
  createdAt: z.string().optional(),
  isDefaultChecked: z.boolean().optional(),
  isNotTrivial: z.boolean().optional(),
  name: z.string(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
  imageUrl: z.string().optional(),
});

const originSchema = z.object({
  _id: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  name: z.string(),
  __v: z.number(),
  id: z.string().optional(),
});

const eatingHabitsCompatibilitySchema = z.object({
  porkless: z.boolean(),
  vegetarian: z.boolean(),
  vegan: z.boolean(),
  glutenFree: z.boolean(),
  dairyFree: z.boolean(),
  pescatarian: z.boolean(),
});

const backgroundPatternSchema = z.object({
  color: z.string(),
  imageUrl: z.string(),
});

const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
});
const pricePerPortionTagSchema = z.object({
  level: z.number(),
  currency: z.string(),
  label: z.string(),
});

const constituentSchema = z.object({
  isOptional: z.boolean(),
  ingredient: ingredientSchema,
  unit: z.object({
    _id: z.string(),
    id: z.string(),
  }),
  additionalMeasures: z.array(z.unknown()).default([]),
  alternatives: z.array(alternativeIngredientSchema).optional(),
});

const recipeSchema = z.object({
  _id: z.string(),
  id: z.string(),
  aggregateRating: z.number(),
  author: authorSchema.partial().optional(),
  backgroundColor: z.string().optional(),
  backgroundPattern: backgroundPatternSchema.optional(),
  composition: z.string().optional(),
  cookingTime: z.number().optional(),
  createdAt: z.string(),
  description: z.string().optional(),
  difficulty: z.number().optional(),
  eatingHabitsCompatibility: eatingHabitsCompatibilitySchema.optional(),
  editorialPictureUrl: z.string().nullable().optional(),
  imageUrl: z.string(),
  imageWithBackgroundPatternUrl: z.string().optional(),
  isAvailable: z.boolean().optional(),
  isTasteCompatible: z.boolean().optional(),
  isVisible: z.boolean().optional(),
  likes: z.number().optional(),
  minimumCoversRequired: z.number().optional(),
  negativeFeedbacks: z.number().optional(),
  notTrivialRequiredToolsIds: z.array(z.string()).default([]),
  origin: originSchema.optional(),
  positiveFeedbacks: z.number().optional(),
  posterUrl: z.string().nullable().optional(),
  preparationExtraTimePerCover: z.number().nullable().optional(),
  preparationTime: z.number().optional(),
  pricePerPortion: z.number().optional(),
  pricePerPortionTag: pricePerPortionTagSchema.optional(),
  requiredTools: z.array(requiredToolsSchema.optional()),
  roundedCoversCount: z.number().optional(),
  seasons: z.array(z.unknown()).default([]),
  slug: z.string().optional(),
  source: z.string().optional(),
  tagsEdito: z.array(z.unknown()).default([]),
  title: z.string().optional(),
  type: z.string().optional(),
  unavailableIngredientsIds: z.array(z.unknown()).default([]),
  videoUrl: z.string().nullable().optional(),
  constituents: z.array(constituentSchema).optional(),
  userConstituents: z.array(z.unknown()).default([]),
  labels: z.array(z.unknown()).default([]),
  origins: z.array(z.unknown()).default([]),
  categories: z.array(z.unknown()).default([]),
});

type Recipe = z.infer<typeof recipeSchema>;

export { recipeSchema };
export type { Recipe };
