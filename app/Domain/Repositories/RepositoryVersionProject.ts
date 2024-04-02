
import { VersionProject } from '../Data/Entities/VersionProject';
import { Pager } from '../Pager';

export interface RepositoryVersionProject {
  getVersionProjects(param: any): Promise<{versionProjects: VersionProject[], pagination: Pager}>
  getVersionProject(id:number): Promise< VersionProject>
  setVersionProject(versionProject: VersionProject): Promise<VersionProject>
  updateVersionProjectAll(versionProject:VersionProject): Promise<VersionProject>
  deleteVersionProject(id:number): Promise<{message: string}>
  cloneVersionProject(id:number): Promise<VersionProject>
  getVersionProjectByProject(id:number, param: any): Promise<{versionProjects:VersionProject[], pagination: Pager}>
}
