import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblStatus extends BaseModel {
  public static readonly table = 'status';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;
}
