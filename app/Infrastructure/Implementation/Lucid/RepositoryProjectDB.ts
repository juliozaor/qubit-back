import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { RepositoryProject } from "App/Domain/Repositories/RepositoryProject";
import { Project } from "App/Domain/Data/Entities/Project";
import TblProject from "App/Infrastructure/Datas/Entity/Projects";
export class RepositoryProjectDB implements RepositoryProject {
  async getProjects(params: any): Promise<{ projects: any[]; pagination: Pager }> {
    const projects: any[] = [];

    const { term, page, limit } = params;

    const sql = TblProject.query().preload('client').preload('projectStatus');
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(subtitle) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const projectsDB = await sql.orderBy("name", "asc").paginate(page, limit);

    projectsDB.forEach((projectsDB:any) => {
      const projectAll = projectsDB.getProject()
      projectAll.clientName = projectsDB.client?.names
      projectAll.projectStatus = projectsDB.projectStatus?.name
      projects.push(projectAll);
    });
    const pagination = PaginationMapperDB.getPager(projectsDB);
    return { projects, pagination };
  }

  async getProject(id: number): Promise<Project> {
    try {
      const project = await TblProject.findOrFail(id);
      return project.getProject();      
    } catch (error) {
      throw new Error("project no found");
      
    }
  }


  async setProject(project: Project): Promise<Project> {
    let projectDB = new TblProject();
    projectDB.setProject(project);
    await projectDB.save();
    return projectDB;
  }

  async updateProjectAll(project:Project): Promise<Project> {
    try {
      let projectDB = await TblProject.findOrFail(project.id);
      projectDB.updateProject(project);
      await projectDB.save();
      return projectDB;
      
    } catch (error) {
      throw new Error("project no found");
    }
  }

  async deleteProject(id:number): Promise<{message: string}> {
    try {
      let projectDB = await TblProject.findOrFail(id);
      await projectDB.delete();
      return {message:'project successfully removed'};
      
    } catch (error) {
      throw new Error("project no found");
    }
  }

  async cloneProject(id: number): Promise<Project> {
    try {
      const project = await TblProject.findOrFail(id);
      const newProject = new TblProject()
      newProject.setProject(project)
      await newProject.save()
      return newProject;      
    } catch (error) {
      throw new Error("Project no found");
      
    }
  }
}
