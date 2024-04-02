import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblProjectStatus extends BaseModel {
  public static readonly table = 'project_status';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;
}
