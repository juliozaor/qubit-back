import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { ConceptDraw } from 'App/Domain/Data/Entities/ConceptDraw';

export default class TblConceptDraw extends BaseModel {
  public static readonly table = 'concept_draws';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column({ columnName: 'preparedby_client_id' })
  public preparedByClientId?: number;

  @column({ columnName: 'preparedby_user_id' })
  public preparedByUserId?: number;

  @column({ columnName: 'client_id' })
  public clientId: number;

  @column({ columnName: 'created_user_id' })
  public createdUserId?: number;

  @column({ columnName: 'updated_user_id' })
  public updatedUserId?: number;

  @column({ columnName: 'type_project_id' })
  public typeProjectId: number;

  @column({ columnName: 'type_application_id' })
  public typeApplicationId: number;

  @column()
  public version: number;

  @column({ columnName: 'approvedby_client_id' })
  public approvedByClientId?: number;

  @column({ columnName: 'approvedby_user_id' })
  public approvedByUserId?: number;

  @column({ columnName: 'xml_base' })
  public xmlBase: string;

  @column({ columnName: 'xml_autocad' })
  public xmlAutocad: string;

  @column({ columnName: 'csv_quote' })
  public csvQuote: string;

  @column({ columnName: 'status_id'})
  public statusId?: number;

  @column({ columnName: 'user_id' })
  public userId?: number;

  @column.dateTime({ autoCreate: true, columnName: 'created_time' })
  public createdTime: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_time' })
  public updatedTime: DateTime;

  public updateConceptDraw(conceptDraw: ConceptDraw) {
    this.id = conceptDraw.id
    this.code = conceptDraw.code
    this.name = conceptDraw.name
    this.preparedByClientId = conceptDraw.preparedByClientId
    this.preparedByUserId = conceptDraw.preparedByUserId
    this.clientId = conceptDraw.clientId
    this.createdUserId = conceptDraw.createdUserId
    this.updatedUserId = conceptDraw.updatedUserId
    this.typeProjectId = conceptDraw.typeProjectId 
    this.typeApplicationId = conceptDraw.typeApplicationId
    this.version = conceptDraw.version
    this.approvedByClientId = conceptDraw.approvedByClientId
    this.approvedByUserId = conceptDraw.approvedByUserId
    this.xmlBase = conceptDraw.xmlBase
    this.xmlAutocad = conceptDraw.xmlAutocad
    this.csvQuote = conceptDraw.csvQuote
    this.statusId = conceptDraw.statusId
    this.userId = conceptDraw.userId
  }

  public setConceptDraw(conceptDraw: ConceptDraw) {
    this.code = conceptDraw.code
    this.name = conceptDraw.name
    this.preparedByClientId = conceptDraw.preparedByClientId
    this.preparedByUserId = conceptDraw.preparedByUserId
    this.clientId = conceptDraw.clientId
    this.createdUserId = conceptDraw.createdUserId
    this.updatedUserId = conceptDraw.updatedUserId
    this.typeProjectId = conceptDraw.typeProjectId 
    this.typeApplicationId = conceptDraw.typeApplicationId
    this.version = conceptDraw.version
    this.approvedByClientId = conceptDraw.approvedByClientId
    this.approvedByUserId = conceptDraw.approvedByUserId
    this.xmlBase = conceptDraw.xmlBase
    this.xmlAutocad = conceptDraw.xmlAutocad
    this.csvQuote = conceptDraw.csvQuote
    this.statusId = conceptDraw.statusId
    this.userId = conceptDraw.userId
  }

  public getConceptDraw(): ConceptDraw {
    const conceptDraw = new ConceptDraw();
    conceptDraw.id= this.id
    conceptDraw.code= this.code
    conceptDraw.name= this.name
    conceptDraw.preparedByClientId= this.preparedByClientId
    conceptDraw.preparedByUserId= this.preparedByUserId
    conceptDraw.clientId= this.clientId
    conceptDraw.createdUserId= this.createdUserId
    conceptDraw.updatedUserId= this.updatedUserId
    conceptDraw.typeProjectId = this.typeProjectId
    conceptDraw.typeApplicationId= this.typeApplicationId
    conceptDraw.version= this.version
    conceptDraw.approvedByClientId= this.approvedByClientId
    conceptDraw.approvedByUserId= this.approvedByUserId
    conceptDraw.xmlBase= this.xmlBase
    conceptDraw.xmlAutocad= this.xmlAutocad
    conceptDraw.csvQuote= this.csvQuote
    conceptDraw.statusId= this.statusId
    conceptDraw.userId= this.userId
  
    return conceptDraw;
  }

}
