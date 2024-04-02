import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { GroupIItem } from "App/Domain/Data/Entities/GroupIItem";
import TblItem from "./Items";
import TblItemGroup from "./ItemGroups";

export default class TblItemIGroup extends BaseModel {
  public static readonly table = "item_i_groups";

  @column({ isPrimary: true })
  public id?: number;

  @column({ columnName: "item_id" })
  public itemId?: number;

  @column({ columnName: "item_group_id" })
  public itemGroupId?: number;

  @column({ columnName: "price_unit" })
  public priceUnit: number;

  @column({ columnName: "number_unit" })
  public numberUnit: number;

  @column({ columnName: "price_total" })
  public priceTotal: number;

  @column({ columnName: "tax" })
  public tax: number;

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

  public updateGroupIItem(iItem: GroupIItem) {
    this.id = iItem.id
    this.itemId = iItem.itemId
    this.itemGroupId = iItem.itemGroupId
    this.priceUnit = iItem.priceUnit
    this.numberUnit = iItem.numberUnit
    this.priceTotal = iItem.priceTotal
    this.tax = iItem.tax
    this.statusId = iItem.statusId
    this.userId = iItem.userId
  }

  public setGroupIItem(iItem: GroupIItem) {
    this.itemId = iItem.itemId
    this.itemGroupId = iItem.itemGroupId
    this.priceUnit = iItem.priceUnit
    this.numberUnit = iItem.numberUnit
    this.priceTotal = iItem.priceTotal
    this.tax = iItem.tax
    this.statusId = iItem.statusId
    this.userId = iItem.userId
  }

  public getGroupIItem(): GroupIItem {
    const iItem = new GroupIItem();
    iItem.id = this.id;
    iItem.itemId = this.itemId;
    iItem.itemGroupId = this.itemGroupId;
    iItem.priceUnit = this.priceUnit;
    iItem.numberUnit = this.numberUnit;
    iItem.priceTotal = this.priceTotal;
    iItem.tax = this.tax;
    iItem.statusId = this.statusId;
    iItem.userId = this.userId;
    return iItem;
  }

  @belongsTo(() => TblItem, {
    localKey: "id",
    foreignKey: "itemId",
  })
  public items: BelongsTo<typeof TblItem>;

  @belongsTo(() => TblItemGroup, {
    localKey: "id",
    foreignKey: "itemGroupId",
  })
  public itemsGroup: BelongsTo<typeof TblItemGroup>;
}