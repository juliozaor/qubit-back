/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceGroupIItemVersion } from 'App/Domain/Data/Services/ServiceGroupIItemVersion';
import { RepositoryGroupIItemVersionDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryGroupIItemVersionDB';
import { ItemIGroupVersionValidationRules } from 'App/Validators/ItemIGroupVersionValidationRules';

export default class ControllerGroupIItemVersion {
 
  private service: ServiceGroupIItemVersion
  constructor () {
    this.service = new ServiceGroupIItemVersion(new RepositoryGroupIItemVersionDB())
  }


  public async getGroupIItemVersions ({response, request}:HttpContextContract){
      const GroupIItemVersions = await this.service.getGroupIItemVersions(request.all())
      return response.status(200).send(GroupIItemVersions);
  }

  public async getGroupIItemVersion ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupIItemVersion id is necessary'});
    }
    const GroupIItemVersion = await this.service.getGroupIItemVersion(id)
      return response.status(200).send(GroupIItemVersion);
  }

  public async cloneGroupIItemVersionByGroup ({response, params}:HttpContextContract){    
    const idOld = params.idOld
    const idNew = params.idNew
    if(!idOld || !idNew){
      return response.status(400).send({message:'The oldId and newId are necessary'});
    }
    const GroupIItemVersion = await this.service.cloneGroupIItemVersion(idOld, idNew)
      return response.status(200).send(GroupIItemVersion);
  }

  public async addGroupIItemVersionByGroup ({response, params}:HttpContextContract){    
    const projectId = params.projectId
    const groupId = params.groupId
    if(!projectId || !groupId){
      return response.status(400).send({message:'The oldId and newId are necessary'});
    }
    const GroupIItemVersion = await this.service.addGroupIItemVersion(projectId, groupId)
      return response.status(200).send(GroupIItemVersion);
  }

  public async getGroupIItemVersionByGroup ({response, params, request}:HttpContextContract){    
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupID id is necessary'});
    }
    const GroupIItemVersion = await this.service.getGroupIItemVersionByGroup(id, request.all())
      return response.status(200).send(GroupIItemVersion);
  }

  public async setGroupIItemVersion ({response, request}:HttpContextContract){
    try {      

      const GroupIItemVersionIn = await request.validate({ schema: ItemIGroupVersionValidationRules })
      const payload = await request.getPayloadJWT()      
      GroupIItemVersionIn.userId = payload.id
      const GroupIItemVersion = await this.service.setGroupIItemVersion(GroupIItemVersionIn)
      return response.created(GroupIItemVersion)
    } catch (error) {
      return response.badRequest(error.messages)
    }    
  }

  

  public async updateGroupIItemVersionAll ({response, request}:HttpContextContract){    
    try {      
      const GroupIItemVersionIn:any = request.all() //.validate({ schema: ItemIGroupVersionValidationRules })
      const payload = await request.getPayloadJWT()      
      GroupIItemVersionIn.userId = payload.id
      const GroupIItemVersion = await this.service.updateGroupIItemVersionAll(GroupIItemVersionIn)
      return response.created(GroupIItemVersion)
    } catch (error) {
      console.log(error);
      
      return response.badRequest(error.messages)
    }
  }
  public async deleteGroupIItemVersion ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The GroupIItemVersion id is necessary'});
    }
    await this.service.deleteGroupIItemVersion(id)
    return response.status(200).send({message:'GroupIItemVersion successfully removed'});
  
  }

  public async deleteGroupIItems ({response, params}:HttpContextContract){
    const groupId = params.groupId
    const projectId = params.projectId
    if(!projectId || !groupId){
      return response.status(400).send({message:'The GroupIItemVersion id is necessary'});
    }
    await this.service.deleteGroupIItems(groupId,projectId)
    return response.status(200).send({message:'GroupIItemVersion successfully removed'});
  
  }

  public async updateGroupIItemVersionByGroup ({response, params}:HttpContextContract){    
    const id = params.id
    const projectId = params.projectId
    if(!id){
      return response.status(400).send({message:'The GroupID id is necessary'});
    }
    const GroupIItemVersion = await this.service.updateGroupIItemVersionByGroup(id, projectId)
      return response.status(200).send(GroupIItemVersion);
  }


}
