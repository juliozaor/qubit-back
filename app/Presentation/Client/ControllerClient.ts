/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceClient } from 'App/Domain/Data/Services/ServiceClient';
import { RepositoryClientDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryCientDB';
import { ClientValidationRules } from 'App/Validators/clientValidationRules';

export default class ControllerClient {
  private service: ServiceClient
  constructor () {
    this.service = new ServiceClient(new RepositoryClientDB())
  }


  public async getClients ({response, request}:HttpContextContract){
      const Clients = await this.service.getClients(request.all())
      return response.status(200).send(Clients);
  }
  public async getClient ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Client id is necessary'});
    }
    const Client = await this.service.getClient(id)
      return response.status(200).send(Client);
  }
  public async setClient ({response, request}:HttpContextContract){
    try {      
      const clientIn = await request.validate({ schema: ClientValidationRules })
      const Client = await this.service.setClient(clientIn)
      return response.created(Client)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateClientAll ({response, request}:HttpContextContract){
    try {      
      const ClientIn = await request.validate({ schema: ClientValidationRules })
      const Client = await this.service.updateClientAll(ClientIn)
      return response.created(Client)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteClient ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Client id is necessary'});
    }
    await this.service.deleteClient(id)
    return response.status(400).send({message:'Client successfully removed'});
  
  }

}
