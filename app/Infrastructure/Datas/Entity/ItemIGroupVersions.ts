import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { GroupIItemVersion } from 'App/Domain/Data/Entities/GroupIItemVersion';
import TblItemGroup from './ItemGroups';
import TblProjectVersion from './ProjectVersions';
import TblItem from './Items';

export default class TblItemIGroupVersion extends BaseModel {
  public static readonly table = 'item_i_group_versions';

  @column({ isPrimary: true })
  public id?: number;

  @column({ columnName: "itemId" })
  public itemId?: number;

  @column({ columnName: "item_group_id" })
  public itemGroupId?: number;

  @column({ columnName: "project_version_id" })
  public projectVersionId?: number;

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

  @column({ columnName: "cost" })
  public cost?: number;

  @column({ columnName: "cost_total" })
  public costTotal?: number;

  @column({ columnName: "margin" })
  public margin?: number;

  @column.dateTime({ autoCreate: true, columnName: "created_time" })
  public createdTime: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_time",
  })
  public updatedTime: DateTime;

  public updateGroupIItemVersion(iItem: GroupIItemVersion) {
    this.id = iItem.id
    this.itemId = iItem.itemId
    this.itemGroupId = iItem.itemGroupId
    this.projectVersionId = iItem.projectVersionId    
    this.priceUnit = iItem.priceUnit
    this.numberUnit = iItem.numberUnit
    this.priceTotal = iItem.priceTotal
    this.tax = iItem.tax
    this.statusId = iItem.statusId
    this.userId = iItem.userId
    this.cost = iItem.cost
    this.costTotal = iItem.costTotal
    this.margin = iItem.margin
    
  
  }

  public setGroupIItemVersion(iItem: GroupIItemVersion) {
    this.itemId = iItem.itemId
    this.itemGroupId = iItem.itemGroupId
    this.priceUnit = iItem.priceUnit
    this.projectVersionId = iItem.projectVersionId   
    this.numberUnit = iItem.numberUnit
    this.priceTotal = iItem.priceTotal
    this.tax = iItem.tax
    this.statusId = iItem.statusId
    this.userId = iItem.userId
    this.cost = iItem.cost
    this.costTotal = iItem.costTotal
    this.margin = iItem.margin
    
  
  }

  public getGroupIItemVersion(): GroupIItemVersion {
    const iItem = new GroupIItemVersion();
    iItem.id = this.id;
    iItem.itemId = this.itemId;
    iItem.itemGroupId = this.itemGroupId;
    iItem.projectVersionId = this.projectVersionId;
    iItem.priceUnit = this.priceUnit;
    iItem.numberUnit = this.numberUnit;
    iItem.priceTotal = this.priceTotal;
    iItem.tax = this.tax;
    iItem.statusId = this.statusId;
    iItem.userId = this.userId;
    iItem.cost = this.cost
    iItem.costTotal = this.costTotal
    iItem.margin = this.margin
   
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

  @belongsTo(() => TblProjectVersion, {
    localKey: "id",
    foreignKey: "projectVersionId",
  })
  public projectVersions: BelongsTo<typeof TblProjectVersion>;
}
