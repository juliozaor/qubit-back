import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { RepositoryClient } from "App/Domain/Repositories/RepositoryClient";
import { Client } from "App/Domain/Data/Entities/Client";
import TblClient from "App/Infrastructure/Datas/Entity/Clients";
export class RepositoryClientDB implements RepositoryClient {
  async getClients(params: any): Promise<{ clients: Client[]; pagination: Pager }> {
    const clients: Client[] = [];
    const { term, page, limit } = params;

    const sql = TblClient.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(names) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(surnames) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const clientsDB = await sql.orderBy("names", "asc").paginate(page, limit);

    clientsDB.forEach((clientsDB) => {
      clients.push(clientsDB.getClient());
    });
    const pagination = PaginationMapperDB.getPager(clientsDB);
    return { clients, pagination };
  }

  async getClient(id: number): Promise<Client> {
    try {
      const client = await TblClient.findOrFail(id);
      return client.getClient();      
    } catch (error) {
      throw new Error("client no found");
      
    }
  }


  async setClient(client: Client): Promise<Client> {
    let clientDB = new TblClient();
    clientDB.setClient(client);
    await clientDB.save();
    return clientDB;
  }

  async updateClientAll(client:Client): Promise<Client> {
    try {
      let clientDB = await TblClient.findOrFail(client.id);
      clientDB.updateClient(client);
      await clientDB.save();
      return clientDB;
      
    } catch (error) {
      throw new Error("client no found");
    }
  }

  async deleteClient(id:number): Promise<{message: string}> {
    try {
      let clientDB = await TblClient.findOrFail(id);
      await clientDB.delete();
      return {message:'client successfully removed'};
      
    } catch (error) {
      throw new Error("client no found");
    }
  }


}
