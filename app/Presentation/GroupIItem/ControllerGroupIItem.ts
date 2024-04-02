/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceGroupIItem } from 'App/Domain/Data/Services/ServiceGroupIItem';
import { RepositoryGroupIItemDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryGroupIItemDB';
import { ItemIGroupValidationRules } from 'App/Validators/ItemIGroupValidationRules';

export default class ControllerGroupIItem {
 
  private service: ServiceGroupIItem
  constructor () {
    this.service = new ServiceGroupIItem(new RepositoryGroupIItemDB())
  }


  public async getGroupIItems ({response, request}:HttpContextContract){
      const GroupIItems = await this.service.getGroupIItems(request.all())
      return response.status(200).send(GroupIItems);
  }

  public async getGroupIItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupIItem id is necessary'});
    }
    const GroupIItem = await this.service.getGroupIItem(id)
      return response.status(200).send(GroupIItem);
  }

  public async cloneGroupIItemByGroup ({response, params}:HttpContextContract){    
    const idOld = params.idOld
    const idNew = params.idNew
    if(!idOld || !idNew){
      return response.status(400).send({message:'The oldId and newId are necessary'});
    }
    const GroupIItem = await this.service.cloneGroupIItem(idOld, idNew)
      return response.status(200).send(GroupIItem);
  }

  public async getGroupIItemByGroup ({response, params, request}:HttpContextContract){    
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupID id is necessary'});
    }
    const GroupIItem = await this.service.getGroupIItemByGroup(id, request.all())
      return response.status(200).send(GroupIItem);
  }

  public async setGroupIItem ({response, request}:HttpContextContract){
    try {      

      const GroupIItemIn = await request.validate({ schema: ItemIGroupValidationRules })
      const payload = await request.getPayloadJWT()      
      GroupIItemIn.userId = payload.id
      const GroupIItem = await this.service.setGroupIItem(GroupIItemIn)
      return response.created(GroupIItem)
    } catch (error) {
      return response.badRequest(error.messages)
    }    
  }

  

  public async updateGroupIItemAll ({response, request}:HttpContextContract){
    try {      
      const GroupIItemIn = await request.validate({ schema: ItemIGroupValidationRules })
      const payload = await request.getPayloadJWT()      
      GroupIItemIn.userId = payload.id
      const GroupIItem = await this.service.updateGroupIItemAll(GroupIItemIn)
      return response.created(GroupIItem)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteGroupIItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupIItem id is necessary'});
    }
    await this.service.deleteGroupIItem(id)
    return response.status(200).send({message:'GroupIItem successfully removed'});
  
  }
}
