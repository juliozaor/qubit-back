import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import { User } from 'App/Domain/Data/Entities/User';
import Roles from './Authorization/Roles';

export default class TblUsers extends BaseModel {
  public static readonly table = 'users';

  @column({ isPrimary: true })
  public id: number;
  
  @column()
  public name: string;
  
  @column()
  public lastname: string;
  
  @column()
  public document: number;
  
  @column()
  public user: string;
  
  @column()
  public password: string;
  
  @column({ columnName: 'temporary_password' })
  public temporaryPassword: boolean;
  
  @column({ columnName: 'dateBirth' })
  public dateBirth: Date;
  
  @column()
  public phone: string;
  
  @column()
  public mail: string;
  
  @column({ columnName: 'role_id' })
  public roleId: number;
  
  @column()
  public state: boolean;
  
  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;
  
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  public establecerUsuarioDb (user: User) {
    this.name = user.name
    this.user = user.user
    this.password = user.password
    this.temporaryPassword = user.temporaryPassword
    this.phone = user.phone
    this.mail = user.mail
    this.dateBirth = user.dateBirth
    this.lastname = user.lastname
    this.document = user.document
    this.state = user.state
    this.roleId = user.roleId
  }

  public obtenerUsuario (): User {
    const user = new User()
    user.id = this.id
    user.name = this.name
    user.user = this.user
    user.password = this.password
    user.state = this.state
    user.lastname = this.lastname
    user.document = this.document
    user.temporaryPassword = this.temporaryPassword
    user.mail = this.mail
    user.dateBirth = this.dateBirth
    user.phone = this.phone
    user.roleId = this.roleId

    return user
  }

  @belongsTo(() => Roles, {
    localKey: 'id',
    foreignKey: 'roleId',
  })
  public rol: BelongsTo<typeof Roles>

 

}
