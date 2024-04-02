import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { GroupItem } from "App/Domain/Data/Entities/GroupItem";
import TblItemGroups from "App/Infrastructure/Datas/Entity/ItemGroups";
import { RepositoryGroupItems } from "App/Domain/Repositories/RepositoryGroupItems";
export class RepositoryGroupItemDB implements RepositoryGroupItems {
  async getGroupItems(params: any): Promise<{ groupItems: GroupItem[]; pagination: Pager }> {
    const groupItems: GroupItem[] = [];
    const { term, page, limit } = params;

    const sql = TblItemGroups.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const groupItemDB = await sql.orderBy("name", "asc").paginate(page, limit);

    groupItemDB.forEach((groupItemDB) => {
      groupItems.push(groupItemDB.getGroupItem());
    });
    const pagination = PaginationMapperDB.getPager(groupItemDB);
    return { groupItems, pagination };
  }

  async getGroupItem(id: number): Promise<GroupItem> {
    try {
      const groupItem = await TblItemGroups.findOrFail(id);
      return groupItem.getGroupItem();      
    } catch (error) {
      throw new Error("groupItem no found");
      
    }
  }

  async cloneGroupItem(id: number): Promise<GroupItem> {
    try {
      const groupItem = await TblItemGroups.findOrFail(id);
      const newGroupItem = new TblItemGroups()
      newGroupItem.setGroupItem(groupItem)
      await newGroupItem.save()
      return newGroupItem;      
    } catch (error) {
      throw new Error("groupItem no found");
      
    }
  }


  async setGroupItem(groupItem: GroupItem): Promise<GroupItem> {
    let groupItemDB = new TblItemGroups();
    groupItemDB.setGroupItem(groupItem);
    await groupItemDB.save();
    return groupItemDB;
  }

  async updateGroupItemAll(groupItem:GroupItem): Promise<GroupItem> {
    try {
      let groupItemDB = await TblItemGroups.findOrFail(groupItem.id);
      groupItemDB.updateGroupItem(groupItem);
      await groupItemDB.save();
      return groupItemDB;
      
    } catch (error) {
      throw new Error("groupItem no found");
    }
  }

  async deleteGroupItem(id:number): Promise<{message: string}> {
    try {
      let groupItemDB = await TblItemGroups.findOrFail(id);
      await groupItemDB.delete();
      return {message:'groupItem successfully removed'};
      
    } catch (error) {
      throw new Error("groupItem no found");
    }
  }


}
