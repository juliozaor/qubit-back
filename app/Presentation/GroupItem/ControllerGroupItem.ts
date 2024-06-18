/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceGroupItem } from 'App/Domain/Data/Services/ServiceGroupItem';
import { RepositoryGroupItemDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryGroupItemDB';
import { GroupItemValidationRules } from 'App/Validators/groupItemValidationRules';

export default class ControllerGroupItem {
 
  private service: ServiceGroupItem
  constructor () {
    this.service = new ServiceGroupItem(new RepositoryGroupItemDB())
  }


  public async getGroupItems ({response, request}:HttpContextContract){
      const GroupItems = await this.service.getGroupItems(request.all())
      return response.status(200).send(GroupItems);
  }
  public async getGroupItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupItem id is necessary'});
    }
    const GroupItem = await this.service.getGroupItem(id)
      return response.status(200).send(GroupItem);
  }

  public async cloneGroupItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupItem id is necessary'});
    }
    const GroupItem = await this.service.cloneGroupItem(id)
      return response.status(200).send(GroupItem);
  }

  public async setGroupItem ({response, request}:HttpContextContract){
    try {      

      const GroupItemIn = await request.validate({ schema: GroupItemValidationRules })
      const GroupItem = await this.service.setGroupItem(GroupItemIn)
      return response.created(GroupItem)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateGroupItemAll ({response, request}:HttpContextContract){
    try {      
      const GroupItemIn = await request.validate({ schema: GroupItemValidationRules })
      const GroupItem = await this.service.updateGroupItemAll(GroupItemIn)
      return response.created(GroupItem)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteGroupItem ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupItem id is necessary'});
    }
    await this.service.deleteGroupItem(id)
    return response.status(200).send({message:'GroupItem successfully removed'});
  
  }

  public async getGroupsItems ({response, request}:HttpContextContract){
    const GroupItems = await this.service.getGroupsItems(request.all())
    return response.status(200).send(GroupItems);
}
}
