import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { Status } from 'App/Domain/Data/Entities/Masters/Status';

export default class TblStatus extends BaseModel {
  public static readonly table = 'status';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateStatus (status: Status) {
    this.id = status.id
    this.name = status.name
  }

  public setStatus (status: Status) {
    this.id = status.id
    this.name = status.name
  }

  public getStatus(): Status {
    const status = new Status();
    status.id = this.id
    status.name = this.name
    return status;
  }
  
}