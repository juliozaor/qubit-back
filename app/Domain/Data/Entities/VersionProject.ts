import { DateTime } from "luxon";

export class VersionProject{
  id?: number;
  projectId: number;
  version: string;
  preparedByClientId?: number;
  preparedByUserId?: number;
  createdUserId?: number;
  updatedUserId?: number;
  conceptnetDrawId: number;
  revisedDate: string;
  executiveSummary: string;
  scopeWork: string;
  tradingConditions: string;
  commentClarifications: string;
  paymentTerms: string;
  quotePath: string;
  quoteName: string;
  statusId?: number;
  userId?: number;
}