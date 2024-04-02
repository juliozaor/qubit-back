import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const ProjectValidationRules = schema.create({
  id: schema.number.optional(),
  code: schema.string({}, [rules.required()]),
  name: schema.string({}, [rules.required()]),
  subtitle: schema.string({}, [rules.required()]),
  preparedByClientId: schema.number.optional(),
  preparedByUserId: schema.number.optional(),
  clientId: schema.number(),
  createdUserId: schema.number.optional(),
  updatedUserId: schema.number.optional(),
  typeProjectId: schema.number(),
  typeApplicationId: schema.number(),
  projectStatusId: schema.number(),
  conceptnetDrawId: schema.number(),
  basepath: schema.string({}, [rules.required()]),
  projectVersionId: schema.number.optional(),
  statusId: schema.number.optional(),
  userId: schema.number.optional(),
});