
import { RepositoryClient } from 'App/Domain/Repositories/RepositoryClient';
import { Pager } from '../../Pager';
import { Client } from '../Entities/Client';

export class ServiceClient{
  constructor (private repository: RepositoryClient) { }

  async getClients(param: any): Promise<{clients: Client[], pagination: Pager}>{
    return this.repository.getClients(param)
  }
  async getClient(id:number): Promise<Client>{
    return this.repository.getClient(id)
  }
  async setClient(client: Client): Promise<Client>{
    return this.repository.setClient(client)
  }
  async updateClientAll(client:Client): Promise<Client>{
    return this.repository.updateClientAll(client)
  }
  async deleteClient(id:number): Promise<{message: string}>{
    return this.repository.deleteClient(id)
  }


}
