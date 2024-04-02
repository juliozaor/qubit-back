import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { GroupItem } from "App/Domain/Data/Entities/GroupItem";

export default class TblItemGroup extends BaseModel {
  public static readonly table = "item_groups";

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

  public updateGroupItem(item: GroupItem) {
    this.id = item.id
    this.code = item.code
    this.name = item.name
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public setGroupItem(item: GroupItem) {
    this.code = item.code
    this.name = item.name
    this.statusId = item.statusId
    this.userId = item.userId
  }

  public getGroupItem(): GroupItem {
    const item = new GroupItem();
    item.id = this.id;
    item.code = this.code;
    item.name = this.name;
    item.statusId = this.statusId;
    item.userId = this.userId;
    return item;
  }
}
