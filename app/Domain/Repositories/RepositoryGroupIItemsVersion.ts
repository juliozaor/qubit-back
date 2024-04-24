
import { GroupIItemVersion } from '../Data/Entities/GroupIItemVersion';
import { Pager } from '../Pager';

export interface RepositoryGroupIItemsVersion {
  getGroupIItemVersions(param: any): Promise<{groupIItemVersions: GroupIItemVersion[], pagination: Pager}>
  getGroupIItemVersion(id:number): Promise<GroupIItemVersion>
  cloneGroupIItemVersion(idOld:number, idNew:number): Promise<{message: string}>
  addGroupIItemVersion(projectId:number, groupId:number): Promise<{message: string}>
  getGroupIItemVersionByGroup(id:number, param: any): Promise<{groupIItemVersions:any, pagination: Pager}>
  setGroupIItemVersion(groupIItemVersion: GroupIItemVersion): Promise<GroupIItemVersion>
  updateGroupIItemVersionAll(groupIItemVersion:GroupIItemVersion): Promise<GroupIItemVersion>
  deleteGroupIItemVersion(id:number): Promise<{message: string}>
  deleteGroupIItems(groupId: number, projectId: number): Promise<{message: string}>
  getGroupIItemVersion(id:number): Promise<GroupIItemVersion>
  updateGroupIItemVersionByGroup(id:number, projectId:number): Promise<{message: string}>
}
