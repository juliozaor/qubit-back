/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceVersionProject } from 'App/Domain/Data/Services/ServiceVersionProject'
import { RepositoryVersionProjectDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryVersionProjectDB'
import { VersionProjectValidationRules } from 'App/Validators/versionProjectValidationRules'

export default class ControllerVersionVersionProject {
 
  private service: ServiceVersionProject
  constructor () {
    this.service = new ServiceVersionProject(new RepositoryVersionProjectDB())
  }


  public async getVersionProjects ({response, request}:HttpContextContract){
      const VersionProjects = await this.service.getVersionProjects(request.all())
      return response.status(200).send(VersionProjects);
  }
  public async getVersionProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The VersionProject id is necessary'});
    }
    const VersionProject = await this.service.getVersionProject(id)
      return response.status(200).send(VersionProject);
  }
  public async setVersionProject ({response, request}:HttpContextContract){
    try {      

      const VersionProjectIn:any = await request.all()//validate({ schema: VersionProjectValidationRules })
      const payload = await request.getPayloadJWT()      
      VersionProjectIn.userId = payload.id
      const VersionProject = await this.service.setVersionProject(VersionProjectIn)
      return response.created(VersionProject)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateVersionProjectAll ({response, request}:HttpContextContract){
    try {      
      const VersionProjectIn = await request.validate({ schema: VersionProjectValidationRules })
      const payload = await request.getPayloadJWT()      
      VersionProjectIn.userId = payload.id
      const VersionProject = await this.service.updateVersionProjectAll(VersionProjectIn)
      return response.created(VersionProject)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteVersionProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The VersionProject id is necessary'});
    }
    await this.service.deleteVersionProject(id)
    return response.status(400).send({message:'VersionProject successfully removed'});
  
  }
 

  public async getVersionProjectByProject ({response, params, request}:HttpContextContract){    
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The ProjectID id is necessary'});
    }
    const VersionProject = await this.service.getVersionProjectByProject(id, request.all())
      return response.status(200).send(VersionProject);
  }

  public async cloneVersionProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The VersionProject id is necessary'});
    }
    const VersionProject = await this.service.cloneVersionProject(id)
      return response.status(200).send(VersionProject);
  }

}
