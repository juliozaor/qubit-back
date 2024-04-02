import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const VersionProjectValidationRules = schema.create({
  id: schema.number.optional(),
  projectId: schema.number(),
  version: schema.string({}, [rules.required()]),
  preparedByClientId: schema.number.optional(),
  preparedByUserId: schema.number.optional(),
  createdUserId: schema.number.optional(),
  updatedUserId: schema.number.optional(),
  conceptnetDrawId: schema.number(),
  revisedDate: schema.date.optional(),
  executiveSummary: schema.string({}, [rules.required()]),
  scopeWork: schema.string({}, [rules.required()]),
  tradingConditions: schema.string({}, [rules.required()]),
  commentClarifications: schema.string({}, [rules.required()]),
  paymentTerms: schema.string({}, [rules.required()]),
  quotePath: schema.string({}, [rules.required()]),
  quoteName: schema.string({}, [rules.required()]),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
});