/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceItem } from 'App/Domain/Data/Services/ServiceItem'
import { RepositoryItemDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryItemDB'
import { itemValidationRules } from 'App/Validators/itemValidationRules'

export default class ControllerItem {
  private service: ServiceItem
  constructor () {
    this.service = new ServiceItem(new RepositoryItemDB())
  }


  public async getItems ({response, request}:HttpContextContract){
      const items = await this.service.getItems(request.all())
      return response.status(200).send(items);
  }
  public async getItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The item id is necessary'});
    }
    const item = await this.service.getItem(id)
      return response.status(200).send(item);
  }
  public async setItem ({response, request}:HttpContextContract){
    try {      

      const itemIn = await request.validate({ schema: itemValidationRules })
      const payload = await request.getPayloadJWT()      
      itemIn.userId = payload.id
      const item = await this.service.setItem(itemIn)
      return response.created(item)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateItemAll ({response, request}:HttpContextContract){
    try {      
      const itemIn = await request.validate({ schema: itemValidationRules })
      const payload = await request.getPayloadJWT()      
      itemIn.userId = payload.id
      const item = await this.service.updateItemAll(itemIn)
      return response.created(item)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The item id is necessary'});
    }
    await this.service.deleteItem(id)
    return response.status(400).send({message:'Item successfully removed'});
  
  }

}
