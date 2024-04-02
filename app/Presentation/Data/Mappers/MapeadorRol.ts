import { Rol } from 'App/Domain/Data/Entities/Authorization/Rol'
import { RolDatos } from '../Data/RoleData'

export class MapeadorRol{
  public static convertirARolDto (rol: Rol): RolDatos{
    let roles = new RolDatos()
    roles.id = rol.id
    roles.state = rol.state
    roles.name = rol.name
    roles.createdTime = rol.createdTime
    roles.updatedTime = rol.updatedTime
    roles.modules = rol.modules

    return roles
  }
}
