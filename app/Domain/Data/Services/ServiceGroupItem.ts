
import { Pager } from '../../Pager';
import { GroupItem } from '../Entities/GroupItem';
import { RepositoryGroupItems } from 'App/Domain/Repositories/RepositoryGroupItems';

export class ServiceGroupItem{
  constructor (private repository: RepositoryGroupItems) { }

  async getGroupItems(param: any): Promise<{groupItems: GroupItem[], pagination: Pager}>{
    return this.repository.getGroupItems(param)
  }
  async getGroupItem(id:number): Promise<GroupItem>{
    return this.repository.getGroupItem(id)
  }

  async cloneGroupItem(id:number): Promise<GroupItem>{
    return this.repository.cloneGroupItem(id)
  }

  async setGroupItem(GroupItem: GroupItem): Promise<GroupItem>{
    return this.repository.setGroupItem(GroupItem)
  }
  async updateGroupItemAll(GroupItem:GroupItem): Promise<GroupItem>{
    return this.repository.updateGroupItemAll(GroupItem)
  }
  async deleteGroupItem(id:number): Promise<{message: string}>{
    return this.repository.deleteGroupItem(id)
  }

  async getGroupsItems(param: any): Promise<{groupItems: any}>{
    return this.repository.getGroupsItems(param)
  }
}
