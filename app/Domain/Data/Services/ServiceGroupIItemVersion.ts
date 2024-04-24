
import { Pager } from '../../Pager';
import { GroupIItemVersion } from '../Entities/GroupIItemVersion';
import { RepositoryGroupIItemsVersion } from 'App/Domain/Repositories/RepositoryGroupIItemsVersion';

export class ServiceGroupIItemVersion{
  constructor (private repository: RepositoryGroupIItemsVersion) { }

  async getGroupIItemVersions(param: any): Promise<{groupIItemVersions: GroupIItemVersion[], pagination: Pager}>{
    return this.repository.getGroupIItemVersions(param)
  }
  async getGroupIItemVersion(id:number): Promise<GroupIItemVersion>{
    return this.repository.getGroupIItemVersion(id)
  }

  async cloneGroupIItemVersion(idOld:number, idNew:number): Promise<{message: string}>{
    return this.repository.cloneGroupIItemVersion(idOld, idNew)
  }

  async addGroupIItemVersion(projectId:number, groupId:number): Promise<{message: string}>{
    return this.repository.addGroupIItemVersion(projectId, groupId)
  }

  async getGroupIItemVersionByGroup(id:number, param: any): Promise<{groupIItemVersions:any, pagination: Pager}>{
    return this.repository.getGroupIItemVersionByGroup(id, param)
  }
  async setGroupIItemVersion(GroupIItemVersion: GroupIItemVersion): Promise<GroupIItemVersion>{
    return this.repository.setGroupIItemVersion(GroupIItemVersion)
  }
  async updateGroupIItemVersionAll(GroupIItemVersion:GroupIItemVersion): Promise<GroupIItemVersion>{
    return this.repository.updateGroupIItemVersionAll(GroupIItemVersion)
  }
  async deleteGroupIItemVersion(id:number): Promise<{message: string}>{
    return this.repository.deleteGroupIItemVersion(id)
  }

  async deleteGroupIItems(groupId: number, projectId: number): Promise<{message: string}>{
    return this.repository.deleteGroupIItems(groupId, projectId)
  }

  async updateGroupIItemVersionByGroup(id:number, projectId:number): Promise<{message: string}>{
    return this.repository.updateGroupIItemVersionByGroup(id, projectId)
  }

}
