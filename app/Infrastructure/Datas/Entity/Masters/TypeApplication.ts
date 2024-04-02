import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TypeApplication } from 'App/Domain/Data/Entities/Masters/TypeApplication';

export default class TblTypeApplication extends BaseModel {
  public static readonly table = 'type_applications';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateTypeApplication (typeApplication: TypeApplication) {
    this.id = typeApplication.id
    this.name = typeApplication.name
  }

  public setTypeApplication (typeApplication: TypeApplication) {
    this.id = typeApplication.id
    this.name = typeApplication.name
  }

  public getTypeApplication(): TypeApplication {
    const typeApplication = new TypeApplication();
    typeApplication.id = this.id
    typeApplication.name = this.name
    return typeApplication;
  }
  
}