import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TypeItem } from 'App/Domain/Data/Entities/Masters/TypeItem';

export default class TblTypeItem extends BaseModel {
  public static readonly table = 'type_items';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateTypeItem (typeItem: TypeItem) {
    this.id = typeItem.id
    this.name = typeItem.name
  }

  public setTypeItem (typeItem: TypeItem) {
    this.id = typeItem.id
    this.name = typeItem.name
  }

  public getTypeItem(): TypeItem {
    const typeItem = new TypeItem();
    typeItem.id = this.id
    typeItem.name = this.name
    return typeItem;
  }
  
}