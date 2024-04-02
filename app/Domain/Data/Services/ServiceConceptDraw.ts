
import { Pager } from '../../Pager';
import { RepositoryConceptDraw } from 'App/Domain/Repositories/RepositoryConceptDraw';
import { ConceptDraw } from '../Entities/ConceptDraw';

export class ServiceConceptDraw{
  constructor (private repository: RepositoryConceptDraw) { }

  async getConceptDraws(param: any): Promise<{conceptDraws: ConceptDraw[], pagination: Pager}>{
    return this.repository.getConceptDraws(param)
  }
  async getConceptDraw(id:number): Promise<ConceptDraw>{
    return this.repository.getConceptDraw(id)
  }
  async setConceptDraw(ConceptDraw: ConceptDraw): Promise<ConceptDraw>{
    return this.repository.setConceptDraw(ConceptDraw)
  }
  async updateConceptDrawAll(ConceptDraw:ConceptDraw): Promise<ConceptDraw>{
    return this.repository.updateConceptDrawAll(ConceptDraw)
  }
  async deleteConceptDraw(id:number): Promise<{message: string}>{
    return this.repository.deleteConceptDraw(id)
  }


}
