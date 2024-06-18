import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { GroupIItem } from "App/Domain/Data/Entities/GroupIItem";
import TblItemIGroup from "App/Infrastructure/Datas/Entity/ItemIGroups";
import { RepositoryGroupIItems } from "App/Domain/Repositories/RepositoryGroupIItems";
export class RepositoryGroupIItemDB implements RepositoryGroupIItems {
  async getGroupIItems(params: any): Promise<{ groupIItems: GroupIItem[]; pagination: Pager }> {
    const groupIItems: GroupIItem[] = [];
    const { term, page, limit } = params;

    const sql = TblItemIGroup.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const groupIItemDB = await sql.orderBy("id", "asc").paginate(page, limit);

    groupIItemDB.forEach((groupIItemDB) => {
      groupIItems.push(groupIItemDB.getGroupIItem());
    });
    const pagination = PaginationMapperDB.getPager(groupIItemDB);
    return { groupIItems, pagination };
  }

  async getGroupIItem(id: number): Promise<GroupIItem> {
    try {
      const groupIItem = await TblItemIGroup.findOrFail(id);
      return groupIItem.getGroupIItem();      
    } catch (error) {
      throw new Error("groupIItem no found");
      
    }
  }

  async getGroupIItemByGroup(id: number, params:any): Promise<{groupIItems:any, pagination: Pager}> {
    const { term, page, limit } = params;
    
    try {      
      const groupIItem = await TblItemIGroup.query().preload('items').preload('itemsGroup').where('item_group_id',id).orderBy("id", "asc").paginate(page, limit);      
      let nameGroup = ''
      const items = new Array()
      

      groupIItem.forEach(group => {
        if( nameGroup == ''){
          nameGroup = group.itemsGroup.name
        }
        items.push({
          id: group.id,
          itemName: group.items.name,
          priceTotal: group.priceTotal,
          priceUnit : group.priceUnit,
          numberUnit: group.numberUnit,
          tax: group.tax,
          cost: group.cost,
          costTotal:group.costTotal,
          margin: group.margin,
          actualQuantity: group.actualQuantity
        })
      });
      const groupItems = {
        nameGroup,
        items
      }

      
      const pagination = PaginationMapperDB.getPager(groupIItem);
    return { groupIItems:groupItems, pagination }; 
    } catch (error) {
      console.log(error);
      
      throw new Error("groupIItem no found");
      
    }
  }

  async cloneGroupIItem(idOld:number, idNew:number): Promise<{message: string}> {
        
    try {      
      const groupIItems: GroupIItem[] = [];
      const groupIItemDB = await TblItemIGroup.query().where('item_group_id',idOld);
      
      groupIItemDB.forEach(async (groupIItemDB) => {
        const newGroupIItem = new TblItemIGroup()
        newGroupIItem.setGroupIItem(groupIItemDB.getGroupIItem())
        newGroupIItem.itemGroupId = idNew
        await newGroupIItem.save()
      });     
      
      
    return { message: 'Items successfully cloned'}; 
    } catch (error) {
      console.log(error);
      
      throw new Error("groupIItem no found");
      
    }
  }


  async setGroupIItem(groupIItem: GroupIItem): Promise<GroupIItem> {
    let groupIItemDB = new TblItemIGroup();
    groupIItemDB.setGroupIItem(groupIItem);
    await groupIItemDB.save();
    return groupIItemDB;
  }

  async updateGroupIItemAll(groupIItem:GroupIItem): Promise<GroupIItem> {
    try {
      let groupIItemDB = await TblItemIGroup.findOrFail(groupIItem.id);
      groupIItemDB.updateGroupIItem(groupIItem);
      await groupIItemDB.save();
      return groupIItemDB;
      
    } catch (error) {
      throw new Error("groupIItem no found");
    }
  }

  async deleteGroupIItem(id:number): Promise<{message: string}> {
    try {
      let groupIItemDB = await TblItemIGroup.findOrFail(id);
      await groupIItemDB.delete();
      return {message:'groupIItem successfully removed'};
      
    } catch (error) {
      throw new Error("groupIItem no found");
    }
  }


  async updateGroupIItemByGroup(id: number): Promise<{message: string}> {
    try {      
      const groupIItem = await TblItemIGroup.query().preload('items').where('item_group_id',id);   
      const items: GroupIItem[] = []
      

      groupIItem.forEach(async group => {
        
        let itemDB = await TblItemIGroup.findOrFail(group.id);
        group.priceUnit = group.items.basePrice
        group.tax = group.items.baseTax;
        group.priceTotal = (group.priceUnit * group.numberUnit)+group.tax; // Calcular
        group.cost = group.items.cost;
        group.actualQuantity = group.items.quantity
        group.costTotal = (group.numberUnit * (group.cost??0))
        group.margin = parseFloat(((group.priceUnit - (group.cost ?? 0)) / (group.cost ?? 0) * 100).toFixed(2));
        itemDB.updateGroupIItem(group);
        await itemDB.save();
      });
      return {message: 'Items update success'}

    } catch (error) {
      console.log(error);
      
      throw new Error("groupIItem no found");
      
    }
  }

}
