export class Project{
  id?: number;
  code: string;
  name: string;
  subtitle: string;
  preparedByClientId?: number;
  preparedByUserId?: number;
  clientId: number;
  createdUserId?: number;
  updatedUserId?: number;
  typeProjectId: number;
  typeApplicationId: number;
  projectStatusId: number;
  conceptnetDrawId: number;
  basepath: string;
  projectVersionId?: number;
  statusId?: number;
  userId?: number;
}