/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Exception } from "@adonisjs/core/build/standalone";
import { Rol } from "App/Domain/Data/Entities/Authorization/Rol";
import { RepositoryRol } from "App/Domain/Repositories/RepositoryRol";
import Modules from "App/Infrastructure/Datas/Entity/Authorization/Modules";
import Roles from "App/Infrastructure/Datas/Entity/Authorization/Roles";
import { Pager } from "../../../Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";

export class RepositoryRolDB implements RepositoryRol {
  async getRolByID(id: string): Promise<Rol> {
    const rolDB = await Roles.findOrFail(id);
    let rol = rolDB?.getRol();
    if (!rolDB) {
      throw new Exception(`No existe el rol ${id}`, 404);
    }
    const modulos = await Modules.query()
      .join("roles_modules", (sql) => {
        sql.on(
          "modules.id",
          "=",
          "roles_modules.module_id"
        );
      })
      .where("roles_modules.rol_id", "=", id);
    modulos.forEach((modulo) => {
      rol.addModule(modulo.getModule());
    });
    return rol;
  }

  async getRols(params: any): Promise<{ rols: Rol[]; pagination: Pager }> {
    const rols: Rol[] = [];
    const rolesBD = await Roles.query()
      .where("root", false)
      .orderBy("name", "desc")
      .paginate(params.page, params.limit);
    rolesBD.forEach((rolesBD) => {
      rols.push(rolesBD.getRol());
    });
    const pagination = PaginationMapperDB.getPager(rolesBD);
    return { rols, pagination };
  }
}
