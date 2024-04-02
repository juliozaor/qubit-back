/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositoryRol } from 'App/Domain/Repositories/RepositoryRol'
import { Rol } from '../Entities/Authorization/Rol'
import { Pager } from '../../Pager';

export class ServiceRol{
  constructor (private repository: RepositoryRol) { }

  async obtenerRolporID (id: string): Promise<Rol>{
    return this.repository.getRolByID(id)
  }

  async obtenerRols (params: any): Promise<{ rols: Rol[], pagination: Pager }> {
    return this.repository.getRols(params);
  }

}
