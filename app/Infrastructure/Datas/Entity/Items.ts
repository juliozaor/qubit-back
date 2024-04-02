import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { Item } from "App/Domain/Data/Entities/Item";

export default class TblItem extends BaseModel {
  public static readonly table = "items";

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column({ columnName: "type_item_id" })
  public typeItemId: number;

  @column({ columnName: "base_price" })
  public basePrice: number;

  @column({ columnName: "base_tax" })
  public baseTax: number;

  @column({ columnName: "type_unit_id" })
  public typeUnitId: number;

  @column({ columnName: "status_id" })
  public statusId?: number;

  @column({ columnName: "user_id" })
  public userId?: number;

  @column.dateTime({ autoCreate: true, columnName: "created_time" })
  public createdTime: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_time",
  })
  public updatedTime: DateTime;

  public updateItem (item: Item) {
    this.id = item.id
    this.code = item.code
    this.name = item.name
    this.description = item.description
    this.typeItemId = item.typeItemId
    this.basePrice = item.basePrice
    this.baseTax = item.baseTax
    this.typeUnitId = item.typeUnitId
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public setItem (item: Item) {
    this.code = item.code
    this.name = item.name
    this.description = item.description
    this.typeItemId = item.typeItemId
    this.basePrice = item.basePrice
    this.baseTax = item.baseTax
    this.typeUnitId = item.typeUnitId
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public getItem(): Item {
    const item = new Item();
    item.id = this.id;
    item.code = this.code;
    item.name = this.name;
    item.description = this.description;
    item.typeItemId = this.typeItemId;
    item.basePrice = this.basePrice;
    item.baseTax = this.baseTax;
    item.typeUnitId = this.typeUnitId;
    item.statusId = this.statusId;
    item.userId = this.userId;
    return item;
  }
}