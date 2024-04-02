/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import Roles from './Roles';
import Modules from './Modules';
export default class RoleModules extends BaseModel {
  public static readonly table = 'roles_modules';

  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: 'rol_id' })
  public roleId: number;

  @column({ columnName: 'module_id' })
  public moduleId: number;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  @belongsTo(() => Roles, {
    localKey: 'id',
    foreignKey: 'rolId',
  })
  public rol: BelongsTo<typeof Roles> 
  
  @belongsTo(() => Modules, {
    localKey: 'id',
    foreignKey: 'moduloId',
  })
  public modulo: BelongsTo<typeof Modules>
 
}
