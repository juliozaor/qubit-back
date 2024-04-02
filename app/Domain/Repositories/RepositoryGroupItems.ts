
import { GroupItem } from '../Data/Entities/GroupItem';
import { Pager } from '../Pager';

export interface RepositoryGroupItems {
  getGroupItems(param: any): Promise<{groupItems: GroupItem[], pagination: Pager}>
  getGroupItem(id:number): Promise<GroupItem>
  cloneGroupItem(id:number): Promise<GroupItem>
  setGroupItem(groupItem: GroupItem): Promise<GroupItem>
  updateGroupItemAll(groupItem:GroupItem): Promise<GroupItem>
  deleteGroupItem(id:number): Promise<{message: string}>
}
