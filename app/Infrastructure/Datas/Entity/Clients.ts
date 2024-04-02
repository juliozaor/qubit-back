import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { Client } from 'App/Domain/Data/Entities/Client';

export default class TblClient extends BaseModel {
  public static readonly table = 'clients';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public names: string;

  @column()
  public surnames: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  public updateClient (client: Client) {
    this.id = client.id
    this.names = client.names
    this.surnames = client.surnames
    this.email = client.email
  }

  public setClient (client: Client) {
    this.names = client.names
    this.surnames = client.surnames
    this.email = client.email
  }

  public getClient(): Client {
    const client = new Client();
    client.id = this.id
    client.names = this.names
    client.surnames = this.surnames
    client.email = this.email
    return client;
  }
  
}
