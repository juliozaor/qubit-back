import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { Category } from "App/Domain/Data/Entities/Category";
import TblItemIGroup from "./ItemIGroups";

export default class Categories extends BaseModel {
  public static readonly table = "categories";

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public code: string;

  @column()
  public name: string;

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

  public updateCategory(item: Category) {
    this.id = item.id
    this.code = item.code
    this.name = item.name
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public setCategory(item: Category) {
    this.code = item.code
    this.name = item.name
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public getCategory(): Category {
    const item = new Category();
    item.id = this.id;
    item.code = this.code;
    item.name = this.name;
    item.statusId = this.statusId;
    item.userId = this.userId;
    return item;
  }
}
