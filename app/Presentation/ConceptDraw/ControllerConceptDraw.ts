/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceConceptDraw } from 'App/Domain/Data/Services/ServiceConceptDraw'
import { RepositoryConceptDrawDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryConceptDrawDB'
import { ConceptDrawValidationRules } from 'App/Validators/conceptDrawValidationRules'
export default class ControllerConceptDraw {
  
  private service: ServiceConceptDraw
  constructor () {
    this.service = new ServiceConceptDraw(new RepositoryConceptDrawDB())
  }


  public async getConceptDraws ({response, request}:HttpContextContract){
      const ConceptDraws = await this.service.getConceptDraws(request.all())
      return response.status(200).send(ConceptDraws);
  }
  public async getConceptDraw ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The ConceptDraw id is necessary'});
    }
    const ConceptDraw = await this.service.getConceptDraw(id)
      return response.status(200).send(ConceptDraw);
  }
  public async setConceptDraw ({response, request}:HttpContextContract){
    try {      

      const ConceptDrawIn = await request.validate({ schema: ConceptDrawValidationRules })
      const payload = await request.getPayloadJWT()      
      ConceptDrawIn.userId = payload.id
      const ConceptDraw = await this.service.setConceptDraw(ConceptDrawIn)
      return response.created(ConceptDraw)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateConceptDrawAll ({response, request}:HttpContextContract){
    try {      
      const ConceptDrawIn:any = await request.all() //validate({ schema: ConceptDrawValidationRules })
      const payload = await request.getPayloadJWT()      
      ConceptDrawIn.userId = payload.id
      const ConceptDraw = await this.service.updateConceptDrawAll(ConceptDrawIn)
      return response.created(ConceptDraw)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteConceptDraw ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The ConceptDraw id is necessary'});
    }
    await this.service.deleteConceptDraw(id)
    return response.status(400).send({message:'ConceptDraw successfully removed'});
  
  }

}
