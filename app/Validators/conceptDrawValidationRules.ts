import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ConceptDrawValidationRules = schema.create({
  id: schema.number.optional(),
  code: schema.string({}, [rules.required()]),
  name: schema.string({}, [rules.required()]),
  preparedByClientId: schema.number.optional(),
  preparedByUserId: schema.number.optional(),
  clientId: schema.number(),
  createdUserId: schema.number.optional(),
  updatedUserId: schema.number.optional(),
  typeProjectId: schema.number(),
  typeApplicationId: schema.number(),
  version: schema.number(),
  approvedByClientId: schema.number.optional(),
  approvedByUserId: schema.number.optional(),
  xmlBase: schema.string({}, [rules.required()]),
  xmlAutocad: schema.string({}, [rules.required()]),
  csvQuote: schema.string({}, [rules.required()]),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
});