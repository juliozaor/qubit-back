/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, ManyToMany, column, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import RolesModules from './RolesModules';
import { Functionality } from 'App/Domain/Data/Entities/Authorization/Functionality';
export default class Functionalities extends BaseModel {
  public static readonly table = 'functionalities';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public state: boolean;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  public setFunctionalityDb (funcionalidad: Functionality):void{
    this.id = funcionalidad.id
    this.name = funcionalidad.name
    this.state = funcionalidad.state
    this.createdTime = funcionalidad.createdTime;
    this.updatedTime = funcionalidad.updatedTime;
  }

  public getFunctionality(): Functionality{
    return new Functionality(
      this.id,
      this.name,
      this.state,
      this.createdTime,
      this.updatedTime
    )
  }

  @manyToMany(() => RolesModules, {
    localKey: 'id',
    pivotForeignKey: 'functionality_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'rol_module_id', 
    pivotTable: 'roles_modules_functionalities'
  })
  public rolModuloFuncionalidad: ManyToMany<typeof RolesModules>


}
