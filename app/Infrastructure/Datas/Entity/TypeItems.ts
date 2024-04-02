import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblTypeItem extends BaseModel {
  public static readonly table = 'type_items';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column({ columnName: 'status_id' })
  public statusId: number;

  @column({ columnName: 'user_id' })
  public userId: number;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;
}
