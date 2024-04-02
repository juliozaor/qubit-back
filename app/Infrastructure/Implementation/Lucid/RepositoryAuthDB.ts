import { Module } from "App/Domain/Data/Entities/Authorization/Module";
import { Rol } from "App/Domain/Data/Entities/Authorization/Rol";
import { RepositoryAuth } from "App/Domain/Repositories/RepositoryAuth";
import TblModulos from "App/Infrastructure/Datas/Entity/Authorization/Modules";
import TblRoles from "App/Infrastructure/Datas/Entity/Authorization/Roles";
import TblFuncionalidades from "App/Infrastructure/Datas/Entity/Authorization/Functionalities";

export class RepositoryAuthDB implements RepositoryAuth {
  private readonly TABLA_ROLES = "tbl_roles";
  private readonly TABLA_ROLES_MODULOS = "tbl_roles_modulos";
  private readonly TABLA_MODULOS = "tbl_modulos";
  private readonly TABLA_FUNCIONALIDADES = "tbl_funcionalidades";

  async getRoleWithModulesAndPermissions(idRol: number): Promise<Rol> {
    const rol = (await TblRoles.findOrFail(idRol)).getRol();
    

    let modulos = await this.obtenerModulosDeUnRol(idRol);    
  

    modulos.forEach((modulo) => {
      rol.addModule(modulo);
    });    
    return rol;
  }

  private async obtenerModulosDeUnRol(idRol: number): Promise<Module[]> {
    const modulosDb = await TblModulos.query()
      .preload("rolModule", (sqlRolModulo) => {
        sqlRolModulo.where("rol_id", idRol);
      })
      .whereHas("rolModule", (sqlRolModulo) => {
        sqlRolModulo.where("rol_id", idRol);
      }).orderBy('order', 'asc');

      
      

      let modulos: Module[] = [];

      for await (const moduloDb of modulosDb) {
        
        const idRolModulo = moduloDb?.$preloaded?.rolModule[0].id;
          const modulo = moduloDb.getModule();
          
          const funcionalidades = await TblFuncionalidades.query()
          .whereHas(
            "rolModuloFuncionalidad",
            (sqlRolModulo) => {
              sqlRolModulo.where("rol_module_id", idRolModulo);
            }
          );


          funcionalidades.forEach((funcionalidad) => {
            modulo.addFunctionality(funcionalidad.getFunctionality());
          });
          
          modulos.push(modulo) ;
        
      }


    return modulos
  }
}
