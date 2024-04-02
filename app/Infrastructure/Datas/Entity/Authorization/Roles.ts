/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { Rol } from 'App/Domain/Data/Entities/Authorization/Rol';
export default class Roles extends BaseModel {
  public static readonly table = 'roles';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public state: boolean;

  @column()
  public root: boolean;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;


  public setRolTblRoles (rol:Rol):void{
    this.id = rol.id
    this.name = rol.name
    this.state = rol.state
    this.createdTime = rol.createdTime;
    this.updatedTime = rol.updatedTime;
  }

  public getRol ():Rol{
    return new Rol(
      this.id,
      this.name,
      this.state,
      false,
      this.createdTime,
      this.updatedTime
    )
  }
}
