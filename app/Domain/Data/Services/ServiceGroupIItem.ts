
import { Pager } from '../../Pager';
import { GroupIItem } from '../Entities/GroupIItem';
import { RepositoryGroupIItems } from 'App/Domain/Repositories/RepositoryGroupIItems';

export class ServiceGroupIItem{
  constructor (private repository: RepositoryGroupIItems) { }

  async getGroupIItems(param: any): Promise<{groupIItems: GroupIItem[], pagination: Pager}>{
    return this.repository.getGroupIItems(param)
  }
  async getGroupIItem(id:number): Promise<GroupIItem>{
    return this.repository.getGroupIItem(id)
  }

  async cloneGroupIItem(idOld:number, idNew:number): Promise<{message: string}>{
    return this.repository.cloneGroupIItem(idOld, idNew)
  }

  async getGroupIItemByGroup(id:number, param: any): Promise<{groupIItems:any, pagination: Pager}>{
    return this.repository.getGroupIItemByGroup(id, param)
  }
  async setGroupIItem(GroupIItem: GroupIItem): Promise<GroupIItem>{
    return this.repository.setGroupIItem(GroupIItem)
  }
  async updateGroupIItemAll(GroupIItem:GroupIItem): Promise<GroupIItem>{
    return this.repository.updateGroupIItemAll(GroupIItem)
  }
  async deleteGroupIItem(id:number): Promise<{message: string}>{
    return this.repository.deleteGroupIItem(id)
  }

  async updateGroupIItemByGroup(id:number): Promise<{message: string}>{
    return this.repository.updateGroupIItemByGroup(id)
  }

}
