/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceProject } from 'App/Domain/Data/Services/ServiceProject';
import { RepositoryProjectDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryProjectDB';
import { ProjectValidationRules } from 'App/Validators/projectValidationRules';
export default class ControllerProject {
 
  private service: ServiceProject
  constructor () {
    this.service = new ServiceProject(new RepositoryProjectDB())
  }


  public async getProjects ({response, request}:HttpContextContract){
      const Projects = await this.service.getProjects(request.all())
      return response.status(200).send(Projects);
  }
  public async getProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Project id is necessary'});
    }
    const Project = await this.service.getProject(id)
      return response.status(200).send(Project);
  }
  public async setProject ({response, request}:HttpContextContract){
    try {      

      const ProjectIn = await request.validate({ schema: ProjectValidationRules })
      const payload = await request.getPayloadJWT()      
      ProjectIn.userId = payload.id
      const Project = await this.service.setProject(ProjectIn)
      return response.created(Project)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateProjectAll ({response, request}:HttpContextContract){
    try {      
      const ProjectIn = await request.validate({ schema: ProjectValidationRules })
      const payload = await request.getPayloadJWT()      
      ProjectIn.userId = payload.id
      const Project = await this.service.updateProjectAll(ProjectIn)
      return response.created(Project)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Project id is necessary'});
    }
    await this.service.deleteProject(id)
    return response.status(400).send({message:'Project successfully removed'});
  
  }

  public async cloneProject ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Project id is necessary'});
    }
    const Project = await this.service.cloneProject(id)
      return response.status(200).send(Project);
  }
}
