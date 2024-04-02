/* eslint-disable max-len */
import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { Module } from "App/Domain/Data/Entities/Authorization/Module";
import RolesModules from "./RolesModules";
export default class Modules extends BaseModel {
  public static readonly table = "modules";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column({ columnName: "display_name" })
  public displayName: string;

  @column()
  public path: string;

  @column()
  public icon: string;

  @column()
  public state: boolean;

  @column()
  public order: number;

  @column.dateTime({ autoCreate: true, columnName: "created_time" })
  public createdTime: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_time",
  })
  public updatedTime: DateTime;

  public setModuleDb(module: Module): void {
    this.id = module.id;
    this.name = module.name;
    this.displayName = module.displayName;
    this.path = module.path;
    this.icon = module.icon;
    this.state = module.state;
    this.order = module.order;
    this.createdTime = module.createdTime;
    this.updatedTime = module.updatedTime;
  }

  public getModule(): Module {
    return new Module(
      this.id,
      this.name,
      this.displayName,
      this.path,
      this.icon,
      this.state,
      this.order,
      this.createdTime,
      this.updatedTime
    );
  }

  @hasMany(() => RolesModules, {
    localKey: "id",
    foreignKey: "moduleId",
  })
  public rolModule: HasMany<typeof RolesModules>;
}
