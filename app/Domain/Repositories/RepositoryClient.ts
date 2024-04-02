/* eslint-disable @typescript-eslint/semi */
import { Client } from '../Data/Entities/Client';
import { Pager } from '../Pager';

export interface RepositoryClient {
  getClients(param: any): Promise<{clients: Client[], pagination: Pager}>
  getClient(id:number): Promise<Client>
  setClient(client:Client): Promise<Client>
  updateClientAll(client:Client): Promise<Client>
  deleteClient(id:number): Promise<{message: string}>
}