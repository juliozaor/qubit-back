import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TypeUnit } from 'App/Domain/Data/Entities/Masters/TypeUnit';

export default class TblTypeUnit extends BaseModel {
  public static readonly table = 'type_units';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateTypeUnit (typeUnit: TypeUnit) {
    this.id = typeUnit.id
    this.name = typeUnit.name
  }

  public setTypeUnit (typeUnit: TypeUnit) {
    this.id = typeUnit.id
    this.name = typeUnit.name
  }

  public getTypeUnit(): TypeUnit {
    const typeUnit = new TypeUnit();
    typeUnit.id = this.id
    typeUnit.name = this.name
    return typeUnit;
  }
  
}