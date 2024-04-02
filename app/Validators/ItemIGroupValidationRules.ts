import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ItemIGroupValidationRules = schema.create({
  id: schema.number.optional(),
  itemId: schema.number.optional(),
  itemGroupId: schema.number.optional(),
  priceUnit: schema.number(),
  numberUnit: schema.number(),
  priceTotal: schema.number(),
  tax: schema.number(),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
}) 