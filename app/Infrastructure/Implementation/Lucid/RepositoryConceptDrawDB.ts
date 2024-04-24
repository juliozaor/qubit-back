import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import TblConceptDraw from "App/Infrastructure/Datas/Entity/ConceptDeaws";
import { ConceptDraw } from "App/Domain/Data/Entities/ConceptDraw";
import { RepositoryConceptDraw } from "App/Domain/Repositories/RepositoryConceptDraw";
export class RepositoryConceptDrawDB implements RepositoryConceptDraw {
  async getConceptDraws(params: any): Promise<{conceptDraws: ConceptDraw[], pagination: Pager}> {
    const conceptDraws: any[] = [];
    const { term, page, limit } = params;

    const sql = TblConceptDraw.query().preload('client').preload('typeProject').preload('typeApplication');
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(version) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const conceptDrawDB = await sql.orderBy("name", "asc").paginate(page, limit);

    conceptDrawDB.forEach((conceptDrawDB:any) => {
      const conceptDrawAll = conceptDrawDB.getConceptDraw()
      conceptDrawAll.clientName = conceptDrawDB.client?.names
      conceptDrawAll.typeProject = conceptDrawDB.typeProject?.name
      conceptDrawAll.typeApplication = conceptDrawDB.typeApplication?.name
      conceptDraws.push(conceptDrawAll)
      //conceptDraws.push(conceptDrawDB.getConceptDraw());
    });
    

    const pagination = PaginationMapperDB.getPager(conceptDrawDB);
    return { conceptDraws, pagination };
  }

  async getConceptDraw(id: number): Promise<ConceptDraw> {
    try {
      const conceptDraw = await TblConceptDraw.findOrFail(id);
      return conceptDraw.getConceptDraw();      
    } catch (error) {
      throw new Error("conceptDraw no found");
      
    }
  }


  async setConceptDraw(conceptDraw: ConceptDraw): Promise<ProjConceptDrawect> {
    let conceptDrawDB = new TblConceptDraw();
    conceptDrawDB.setConceptDraw(conceptDraw);
    await conceptDrawDB.save();
    return conceptDrawDB;
  }

  async updateConceptDrawAll(conceptDraw:ConceptDraw): Promise<ConceptDraw> {
    try {
      let conceptDrawDB = await TblConceptDraw.findOrFail(conceptDraw.id);
      conceptDrawDB.updateConceptDraw(conceptDraw);
      await conceptDrawDB.save();
      return conceptDrawDB;
      
    } catch (error) {
      throw new Error("conceptDraw no found");
    }
  }

  async deleteConceptDraw(id:number): Promise<{message: string}> {
    try {
      let conceptDrawDB = await TblConceptDraw.findOrFail(id);
      await conceptDrawDB.delete();
      return {message:'conceptDraw successfully removed'};
      
    } catch (error) {
      throw new Error("conceptDraw no found");
    }
  }


}
