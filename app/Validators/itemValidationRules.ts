import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const itemValidationRules = schema.create({
  id: schema.number.optional(),
  code: schema.string({}, [rules.required()]),
  name: schema.string({}, [rules.required()]),
  description: schema.string({}, [rules.required()]),
  typeItemId: schema.number([rules.required()]),
  basePrice: schema.number([rules.required()]),
  baseTax: schema.number([rules.required()]),
  typeUnitId: schema.number([rules.required()]),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
  cost: schema.number.optional(),
}) 