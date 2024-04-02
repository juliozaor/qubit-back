
import { Pager } from '../../Pager';
import { RepositoryVersionProject } from 'App/Domain/Repositories/RepositoryVersionProject';
import { VersionProject } from '../Entities/VersionProject';

export class ServiceVersionProject{
  constructor (private repository: RepositoryVersionProject) { }

  async getVersionProjects(param: any): Promise<{versionProjects: VersionProject[], pagination: Pager}>{
    return this.repository.getVersionProjects(param)
  }
  async getVersionProject(id:number): Promise<VersionProject>{
    return this.repository.getVersionProject(id)
  }
  async setVersionProject(VersionProject: VersionProject): Promise<VersionProject>{
    return this.repository.setVersionProject(VersionProject)
  }
  async updateVersionProjectAll(VersionProject:VersionProject): Promise<VersionProject>{
    return this.repository.updateVersionProjectAll(VersionProject)
  }
  async deleteVersionProject(id:number): Promise<{message: string}>{
    return this.repository.deleteVersionProject(id)
  }

  async cloneVersionProject(id:number): Promise<VersionProject>{
    return this.repository.cloneVersionProject(id)
  }

  async getVersionProjectByProject(id:number, param: any): Promise<{versionProjects:VersionProject[], pagination: Pager}>{
    return this.repository.getVersionProjectByProject(id, param)
  }


}
