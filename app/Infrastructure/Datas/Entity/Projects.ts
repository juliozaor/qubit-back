import { DateTime } from "luxon";
import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { Project } from "App/Domain/Data/Entities/Project";
import TblClient from "./Clients";
import TblProjectStatus from "./PojectStatus";

export default class TblProject extends BaseModel {
  public static readonly table = "projects";

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public subtitle: string;

  @column({ columnName: "preparedby_client_id" })
  public preparedByClientId: number;

  @column({ columnName: "preparedby_user_id" })
  public preparedByUserId: number;

  @column({ columnName: "client_id" })
  public clientId: number;

  @column({ columnName: "created_user_id" })
  public createdUserId: number;

  @column({ columnName: "updated_user_id" })
  public updatedUserId: number;

  @column({ columnName: "type_project_id" })
  public typeProjectId: number;

  @column({ columnName: "type_application_id" })
  public typeApplicationId: number;

  @column({ columnName: "project_status_id" })
  public projectStatusId: number;

  @column({ columnName: "conceptnet_draw_id" })
  public conceptnetDrawId: number;

  @column()
  public basepath: string;

  @column({ columnName: "projectversion_id" })
  public projectVersionId?: number;

  @column({ columnName: "status_id" })
  public statusId: number;

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

  public updateProject(project: Project) {
    this.id = project.id
    this.code = project.code
    this.name = project.name
    this.subtitle = project.subtitle
    this.preparedByClientId = project.preparedByClientId
    this.preparedByUserId = project.preparedByUserId
    this.clientId = project.clientId
    this.createdUserId = project.createdUserId
    this.updatedUserId = project.updatedUserId
    this.typeProjectId = project.typeProjectId
    this.typeApplicationId = project.typeApplicationId
    this.projectStatusId = project.projectStatusId
    this.conceptnetDrawId = project.conceptnetDrawId
    this.basepath = project.basepath
    this.projectVersionId = project.projectVersionId
    this.statusId = project.statusId
    this.userId = project.userId
  }

  public setProject(project: Project) {
    this.code = project.code
    this.name = project.name
    this.subtitle = project.subtitle
    this.preparedByClientId = project.preparedByClientId
    this.preparedByUserId = project.preparedByUserId
    this.clientId = project.clientId
    this.createdUserId = project.createdUserId
    this.updatedUserId = project.updatedUserId
    this.typeProjectId = project.typeProjectId
    this.typeApplicationId = project.typeApplicationId
    this.projectStatusId = project.projectStatusId
    this.conceptnetDrawId = project.conceptnetDrawId
    this.basepath = project.basepath
    this.projectVersionId = project.projectVersionId
    this.statusId = project.statusId
    this.userId = project.userId
  }

  public getProject(): Project {
    const project = new Project();
    project.id = this.id;
    project.code = this.code;
    project.name = this.name;
    project.subtitle = this.subtitle;
    project.preparedByClientId = this.preparedByClientId;
    project.preparedByUserId = this.preparedByUserId;
    project.clientId = this.clientId;
    project.createdUserId = this.createdUserId;
    project.updatedUserId = this.updatedUserId;
    project.typeProjectId = this.typeProjectId;
    project.typeApplicationId = this.typeApplicationId;
    project.projectStatusId = this.projectStatusId;
    project.conceptnetDrawId = this.conceptnetDrawId;
    project.basepath = this.basepath;
    project.projectVersionId = this.projectVersionId;
    project.statusId = this.statusId;
    project.userId = this.userId;
    return project;
  }

  

  @hasOne(() => TblClient, {
    localKey: "clientId",
    foreignKey: "id",
  })
  public client: HasOne<typeof TblClient>;

  @hasOne(() => TblProjectStatus, {
    localKey: "projectStatusId",
    foreignKey: "id",
  })
  public projectStatus: HasOne<typeof TblProjectStatus>;

}
