/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceRol } from 'App/Domain/Data/Services/ServiceRol'
import { RepositoryRolDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryRolDB'

export default class ControllerRol {
  private service: ServiceRol
  constructor () {
    this.service = new ServiceRol(new RepositoryRolDB())
  }

  public async list ({ request }) {
    const empresa = await this.service.obtenerRols(request.all())
    return empresa
  }

}
