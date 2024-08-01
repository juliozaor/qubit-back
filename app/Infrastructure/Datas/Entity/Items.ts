import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { Item } from "App/Domain/Data/Entities/Item";
import Categories from "./Categories";

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

  @column({ columnName: "cost" })
  public cost?: number;

  @column({ columnName: "category_id" })
  public categoryId: number;



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
    this.cost = item.cost
    this.userId = item.userId
    this.categoryId = item.categoryId
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
    this.cost = item.cost
    this.categoryId = item.categoryId
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
    item.cost = this.cost
    item.categoryId = this.categoryId
    return item;
  }

  @belongsTo(() => Categories)
  public category: BelongsTo<typeof Categories>
}
