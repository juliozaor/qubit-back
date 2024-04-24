
import { Project } from '../Data/Entities/Project';
import { Pager } from '../Pager';

export interface RepositoryProject {
  getProjects(param: any): Promise<{projects: Project[], pagination: Pager}>
  getProject(id:number): Promise<Project>
  setProject(project: Project): Promise<Project>
  updateProjectAll(project:Project): Promise<Project>
  deleteProject(id:number): Promise<{message: string}>
  cloneProject(id:number): Promise<Project>

}
