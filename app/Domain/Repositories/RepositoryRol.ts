/* eslint-disable @typescript-eslint/semi */
import { Rol } from '../Data/Entities/Authorization/Rol';
import { Pager } from '../Pager';

export interface RepositoryRol {
  getRolByID(id: string): Promise<Rol>
  getRols(param: any): Promise<{rols: Rol[], pagination: Pager}>
}
