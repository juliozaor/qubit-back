
import { Pager } from '../../Pager';
import { Project } from '../Entities/Project';
import { RepositoryProject } from 'App/Domain/Repositories/RepositoryProject';

export class ServiceProject{
  constructor (private repository: RepositoryProject) { }

  async getProjects(param: any): Promise<{projects: Project[], pagination: Pager}>{
    return this.repository.getProjects(param)
  }
  async getProject(id:number): Promise<Project>{
    return this.repository.getProject(id)
  }
  async setProject(Project: Project): Promise<Project>{
    return this.repository.setProject(Project)
  }
  async updateProjectAll(Project:Project): Promise<Project>{
    return this.repository.updateProjectAll(Project)
  }
  async deleteProject(id:number): Promise<{message: string}>{
    return this.repository.deleteProject(id)
  }
  async cloneProject(id:number): Promise<Project>{
    return this.repository.cloneProject(id)
  }

}
