import { ConceptDraw } from '../Data/Entities/ConceptDraw';
import { Pager } from '../Pager';

export interface RepositoryConceptDraw {
  getConceptDraws(param: any): Promise<{conceptDraws: ConceptDraw[], pagination: Pager}>
  getConceptDraw(id:number): Promise<ConceptDraw>
  setConceptDraw(conceptDraw:ConceptDraw): Promise<ConceptDraw>
  updateConceptDrawAll(conceptDraw:ConceptDraw): Promise<ConceptDraw>
  deleteConceptDraw(id:number): Promise<{message: string}>
}
