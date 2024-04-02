import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ClientValidationRules = schema.create({
  id: schema.number.optional(),
  names: schema.string({}, [rules.required()]),
  surnames: schema.string({}, [rules.required()]),
  email: schema.string({}, [rules.required()]),
}) 