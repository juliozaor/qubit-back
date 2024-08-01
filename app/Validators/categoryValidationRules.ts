import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const CategoryValidationRules = schema.create({
  id: schema.number.optional(),
  name: schema.string({}, [rules.required()]),
  code: schema.string({}, [rules.required()]),
  statusId: schema.number.optional(),
}) 