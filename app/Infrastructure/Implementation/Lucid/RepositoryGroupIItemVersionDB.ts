import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { GroupIItemVersion } from "App/Domain/Data/Entities/GroupIItemVersion";
import TblItemIGroupVersion from "App/Infrastructure/Datas/Entity/ItemIGroupVersions";
import { RepositoryGroupIItemsVersion } from "App/Domain/Repositories/RepositoryGroupIItemsVersion";
import TblItemIGroup from "App/Infrastructure/Datas/Entity/ItemIGroups";
export class RepositoryGroupIItemVersionDB
  implements RepositoryGroupIItemsVersion
{
  async getGroupIItemVersions(
    params: any
  ): Promise<{ groupIItemVersions: GroupIItemVersion[]; pagination: Pager }> {
    const groupIItemVersions: GroupIItemVersion[] = [];
    const { term, page, limit } = params;

    const sql = TblItemIGroupVersion.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const groupIItemVersionDB = await sql
      .orderBy("id", "asc")
      .paginate(page, limit);

    groupIItemVersionDB.forEach((groupIItemVersionDB) => {
      groupIItemVersions.push(groupIItemVersionDB.getGroupIItemVersion());
    });
    const pagination = PaginationMapperDB.getPager(groupIItemVersionDB);
    return { groupIItemVersions, pagination };
  }

  async getGroupIItemVersion(id: number): Promise<GroupIItemVersion> {
    try {
      const groupIItemVersion = await TblItemIGroupVersion.findOrFail(id);
      return groupIItemVersion.getGroupIItemVersion();
    } catch (error) {
      throw new Error("groupIItemVersion no found");
    }
  }

  async getGroupIItemVersionByGroup(
    id: number,
    params: any
  ): Promise<{ groupIItemVersions: GroupIItemVersion[]; pagination: Pager }> {
    const { term, page, limit } = params;
    /*   const groupIItemVersions: GroupIItemVersion[] = []; */

    /*  const groupIItemVersions: any[] = []; */
    const groupIItem = new Array();
    try {
      const groupIItemVersionDB = await TblItemIGroupVersion.query()
        .preload("items")
        .preload("itemsGroup")
        .where("project_version_id", id)
        .orderBy("id", "asc")
        .paginate(page, limit);

      /*  groupIItemVersionDB.forEach((groupIItemVersion) => {
        groupIItemVersions.push(groupIItemVersion.getGroupIItemVersion());
      }); */
      const groupedItems = {};

      console.log(groupIItemVersionDB);

      // Recorrer los items del JSON
      groupIItemVersionDB.forEach((version) => {
        const groupId = version.itemsGroup.id;
        if (groupId) {
          // Si el grupo aún no existe en el objeto, crearlo
          if (!groupedItems[groupId]) {
            groupedItems[groupId] = {
              itemsGroup: {
                id: version.itemsGroup.id,
                code: version.itemsGroup.code,
                name: version.itemsGroup.name,
                items: [],
              },
            };
          }

          // Agregar el item al grupo correspondiente
          groupedItems[groupId].itemsGroup.items.push({
            id: version.id,
            code: version.items.code,
            name: version.items.name,
            description: version.items.description,
            priceUnit: version.priceUnit,
            priceTotal: version.priceTotal,
            numberUnit: version.numberUnit,
            tax: version.tax,
          });
        }
      });

      // Convertir el objeto a un array de grupos de items
      const groupIItemVersions = Object.values(groupedItems);

      const pagination = PaginationMapperDB.getPager(groupIItemVersionDB);
      return { groupIItemVersions, pagination };

      /* const pagination = PaginationMapperDB.getPager(groupIItemVersionDB);
    return { groupIItemVersionDB, pagination };  */
    } catch (error) {
      console.log(error);

      throw new Error("groupIItemVersion no found");
    }
  }

  async cloneGroupIItemVersion(
    idOld: number,
    idNew: number
  ): Promise<{ message: string }> {
    try {
      const groupIItemVersions: GroupIItemVersion[] = [];
      const groupIItemVersionDB = await TblItemIGroupVersion.query().where(
        "project_version_id",
        idOld
      );

      groupIItemVersionDB.forEach(async (groupIItemVersionDB) => {
        const newGroupIItemVersion = new TblItemIGroupVersion();
        newGroupIItemVersion.setGroupIItemVersion(
          groupIItemVersionDB.getGroupIItemVersion()
        );
        newGroupIItemVersion.projectVersionId = idNew;
        await newGroupIItemVersion.save();
      });

      return { message: "Items successfully cloned" };
    } catch (error) {
      console.log(error);

      throw new Error("groupIItemVersion no found");
    }
  }

  async addGroupIItemVersion(
    projectId: number,
    groupId: number
  ): Promise<{ message: string }> {
    try {
      const groups = await TblItemIGroup.query()
        .preload("items")
        .where("item_group_id", groupId);
      /*  const groupIItemVersions: GroupIItemVersion[] = [];
      const groupIItemVersionDB = await TblItemIGroupVersion.query().where('project_version_id',idOld);
       */
      groups.forEach(async (group) => {
        const newGroupIItemVersion = new TblItemIGroupVersion();
        newGroupIItemVersion.itemId = group.itemId;
        newGroupIItemVersion.itemGroupId = group.itemGroupId;
        newGroupIItemVersion.projectVersionId = projectId;
        newGroupIItemVersion.priceUnit = group.items.basePrice;
        newGroupIItemVersion.tax = group.items.baseTax;
        await newGroupIItemVersion.save();
      });

      return { message: "Items successfully cloned" };
    } catch (error) {
      console.log(error);

      throw new Error("groupIItemVersion no found");
    }
  }

  async setGroupIItemVersion(
    groupIItemVersion: GroupIItemVersion
  ): Promise<GroupIItemVersion> {
    let groupIItemVersionDB = new TblItemIGroupVersion();
    groupIItemVersionDB.setGroupIItemVersion(groupIItemVersion);
    await groupIItemVersionDB.save();
    return groupIItemVersionDB;
  }

  async updateGroupIItemVersionAll(
    groupIItemVersion: GroupIItemVersion
  ): Promise<GroupIItemVersion> {
    try {
      let groupIItemVersionDB = await TblItemIGroupVersion.findOrFail(
        groupIItemVersion.id
      );
      groupIItemVersionDB.updateGroupIItemVersion(groupIItemVersion);
      await groupIItemVersionDB.save();
      return groupIItemVersionDB;
    } catch (error) {
      throw new Error("groupIItemVersion no found");
    }
  }

  async deleteGroupIItemVersion(id: number): Promise<{ message: string }> {
    try {
      let groupIItemVersionDB = await TblItemIGroupVersion.findOrFail(id);
      await groupIItemVersionDB.delete();
      return { message: "groupIItemVersion successfully removed" };
    } catch (error) {
      throw new Error("groupIItemVersion no found");
    }
  }
}
