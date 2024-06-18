import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ItemIGroupVersionValidationRules = schema.create({
  id: schema.number.optional(),
  itemId: schema.number.optional(),
  itemGroupId: schema.number.optional(),
  projectVersionId: schema.number.optional(),
  priceUnit: schema.number(),
  numberUnit: schema.number(),
  priceTotal: schema.number(),
  tax: schema.number(),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
  cost: schema.number.optional(),
  costTotal: schema.number.optional(),
  margin: schema.number.optional(),
  actualQuantity: schema.number.optional(),
}) 