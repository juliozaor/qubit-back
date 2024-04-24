import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { RepositoryVersionProject } from "App/Domain/Repositories/RepositoryVersionProject";
import { VersionProject } from "App/Domain/Data/Entities/VersionProject";
import TblVersionProject from "App/Infrastructure/Datas/Entity/ProjectVersions";
export class RepositoryVersionProjectDB implements RepositoryVersionProject {
  async getVersionProjects(params: any): Promise<{ versionProjects: VersionProject[]; pagination: Pager }> {
    const versionProjects: VersionProject[] = [];
    const { term, page, limit } = params;

    const sql = TblVersionProject.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(project_id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(version) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const versionProjectsDB = await sql.orderBy("project_id", "asc").paginate(page, limit);

    versionProjectsDB.forEach((versionProjectsDB) => {
      versionProjects.push(versionProjectsDB.getVersionProject());
    });
    const pagination = PaginationMapperDB.getPager(versionProjectsDB);
    return { versionProjects, pagination };
  }

  async getVersionProject(id: number): Promise<any> {
    try {
      const versionProject = await TblVersionProject.query().where('id',id).preload('project').first();
      return versionProject;      
    } catch (error) {
      throw new Error("VersionProject no found");
      
    }
  }


  async setVersionProject(versionProject: VersionProject): Promise<VersionProject> {  
    const date = new Date(versionProject.revisedDate.toString());
    const dateFormat = date.toISOString();
    versionProject.revisedDate=dateFormat

     let versionProjectDB = new TblVersionProject();
     versionProjectDB.setVersionProject(versionProject);
     await versionProjectDB.save();   
     return versionProjectDB;          
     
  }

  async updateVersionProjectAll(versionProject:VersionProject): Promise<VersionProject> {
    try {
      const date = new Date(versionProject.revisedDate.toString());
      const dateFormat = date.toISOString();
      versionProject.revisedDate=dateFormat
      let versionProjectDB = await TblVersionProject.findOrFail(versionProject.id);
      versionProjectDB.updateVersionProject(versionProject);
      await versionProjectDB.save();
      return versionProjectDB;
      
    } catch (error) {
      throw new Error("VersionProject no found");
    }
  }

  async deleteVersionProject(id:number): Promise<{message: string}> {
    try {
      let versionProjectDB = await TblVersionProject.findOrFail(id);
      await versionProjectDB.delete();
      return {message:'VersionProject successfully removed'};
      
    } catch (error) {
      throw new Error("VersionProject no found");
    }
  }

  async getVersionProjectByProject(id: number, params:any): Promise<{versionProjects:VersionProject[], pagination: Pager}> {    
    const versionProjects: VersionProject[] = [];
    const { term, page, limit } = params;

    const sql = TblVersionProject.query().where('project_id', id);
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(project_id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(version) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const versionProjectsDB = await sql.orderBy("version", "asc").paginate(page, limit);

    versionProjectsDB.forEach((versionProjectsDB) => {
      versionProjects.push(versionProjectsDB.getVersionProject());
    });
    const pagination = PaginationMapperDB.getPager(versionProjectsDB);
    return { versionProjects, pagination };
  }

  async cloneVersionProject(id: number): Promise<VersionProject> {
        
    try {
      const versionProject = await TblVersionProject.findOrFail(id);
      const newVersionProject = new TblVersionProject()
      newVersionProject.setVersionProject(versionProject)
      await newVersionProject.save()
      return newVersionProject;      
    } catch (error) {
      throw new Error("VersionProject no found");
      
    }
  }

  async cloneVersionProjectByNewProject(id: number, projectId:number): Promise<VersionProject> {
        
    try {
      const versionProject = await TblVersionProject.findOrFail(id);
      versionProject.projectId = projectId
      const newVersionProject = new TblVersionProject()
      newVersionProject.setVersionProject(versionProject)
      await newVersionProject.save()
      return newVersionProject;      
    } catch (error) {
      throw new Error("VersionProject no found");
      
    }
  }


}
