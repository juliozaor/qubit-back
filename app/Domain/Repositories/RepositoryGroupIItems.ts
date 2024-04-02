
import { GroupIItem } from '../Data/Entities/GroupIItem';
import { Pager } from '../Pager';

export interface RepositoryGroupIItems {
  getGroupIItems(param: any): Promise<{groupIItems: GroupIItem[], pagination: Pager}>
  getGroupIItem(id:number): Promise<GroupIItem>
  cloneGroupIItem(idOld:number, idNew:number): Promise<{message: string}>
  getGroupIItemByGroup(id:number, param: any): Promise<{groupIItems:any, pagination: Pager}>
  setGroupIItem(groupIItem: GroupIItem): Promise<GroupIItem>
  updateGroupIItemAll(groupIItem:GroupIItem): Promise<GroupIItem>
  deleteGroupIItem(id:number): Promise<{message: string}>
  
}
