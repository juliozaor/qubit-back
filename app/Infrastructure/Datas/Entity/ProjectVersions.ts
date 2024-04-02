import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { VersionProject } from 'App/Domain/Data/Entities/VersionProject';

export default class TblProjectVersion extends BaseModel {
  public static readonly table = 'project_versions';

  @column({ isPrimary: true })
  public id?: number;

  @column({ columnName: 'project_id' })
  public projectId: number;

  @column()
  public version: string;

  @column({ columnName: 'preparedby_client_id' })
  public preparedByClientId?: number;

  @column({ columnName: 'preparedby_user_id' })
  public preparedByUserId?: number;

  @column({ columnName: 'created_user_id' })
  public createdUserId?: number;

  @column({ columnName: 'updated_user_id' })
  public updatedUserId?: number;

  @column({ columnName: 'conceptnet_draw_id' })
  public conceptnetDrawId: number;

  @column.dateTime({ columnName: 'revised_date' })
  public revisedDate: DateTime;

  @column()
  public executiveSummary: string;

  @column()
  public scopeWork: string;

  @column({ columnName: 'trading_conditions' })
  public tradingConditions: string;

  @column({ columnName: 'comment_clarifications' })
  public commentClarifications: string;

  @column({ columnName: 'payment_terms' })
  public paymentTerms: string;

  @column({ columnName: 'quote_path' })
  public quotePath: string;

  @column({ columnName: 'quote_name' })
  public quoteName: string;

  @column({ columnName: 'status_id'})
  public statusId?: number;

  @column({ columnName: 'user_id' })
  public userId?: number;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  public updateVersionProject(versionProject: VersionProject) {
    this.id = versionProject.id
    this.projectId = versionProject.projectId
    this.version = versionProject.version
    this.preparedByClientId = versionProject.preparedByClientId
    this.preparedByUserId = versionProject.preparedByUserId
    this.createdUserId = versionProject.createdUserId
    this.updatedUserId = versionProject.updatedUserId
    this.conceptnetDrawId = versionProject.conceptnetDrawId
    this.revisedDate = versionProject.revisedDate  
    this.executiveSummary = versionProject.executiveSummary
    this.scopeWork = versionProject.scopeWork
    this.tradingConditions = versionProject.tradingConditions
    this.commentClarifications = versionProject.commentClarifications
    this.paymentTerms = versionProject.paymentTerms
    this.quotePath = versionProject.quotePath
    this.quoteName = versionProject.quoteName
    this.statusId = versionProject.statusId
    this.userId = versionProject.userId
  }

  public setVersionProject(versionProject: VersionProject) {
    this.projectId = versionProject.projectId
    this.version = versionProject.version
    this.preparedByClientId = versionProject.preparedByClientId
    this.preparedByUserId = versionProject.preparedByUserId
    this.createdUserId = versionProject.createdUserId
    this.updatedUserId = versionProject.updatedUserId
    this.conceptnetDrawId = versionProject.conceptnetDrawId
    this.revisedDate = versionProject.revisedDate
    this.executiveSummary = versionProject.executiveSummary
    this.scopeWork = versionProject.scopeWork
    this.tradingConditions = versionProject.tradingConditions
    this.commentClarifications = versionProject.commentClarifications
    this.paymentTerms = versionProject.paymentTerms
    this.quotePath = versionProject.quotePath
    this.quoteName = versionProject.quoteName
    this.statusId = versionProject.statusId
    this.userId = versionProject.userId
  }

  public getVersionProject(): VersionProject {
    const versionProject = new VersionProject();
    versionProject.id = this.id
    versionProject.projectId = this.projectId
    versionProject.version = this.version
    versionProject.preparedByClientId = this.preparedByClientId
    versionProject.preparedByUserId = this.preparedByUserId
    versionProject.createdUserId = this.createdUserId
    versionProject.updatedUserId = this.updatedUserId
    versionProject.conceptnetDrawId = this.conceptnetDrawId
    versionProject.revisedDate = this.revisedDate
    versionProject.executiveSummary = this.executiveSummary
    versionProject.scopeWork = this.scopeWork
    versionProject.tradingConditions = this.tradingConditions
    versionProject.commentClarifications = this.commentClarifications
    versionProject.paymentTerms = this.paymentTerms
    versionProject.quotePath = this.quotePath
    versionProject.quoteName = this.quoteName
    versionProject.statusId = this.statusId
    versionProject.userId = this.userId
    return versionProject;
  }

}
