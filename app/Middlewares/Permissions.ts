
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TblFuncionalidades from 'App/Infrastructure/Datas/Entity/Authorization/Functionalities';
import TblRolesModulos from 'App/Infrastructure/Datas/Entity/Authorization/RolesModules';

export default class Permisos {

  async handle({ request, response }:HttpContextContract, next, permisos) {
    const { idRol } = await request.getPayloadJWT()
    const  idModulo = permisos[0];
    const idFuncionalidad  = permisos[1];


    const rolModulo = await TblRolesModulos.query().where(
      {
        'rol_id':idRol,
        'module_id':idModulo
      }).first()

      if (!rolModulo?.id) {
        return response.status(403).json({
          message: 'No tienes permisos para acceder a esta ruta.1',
        });
      }
    
    const modulosFuncionalidades =  await TblFuncionalidades.query().whereHas('rolModuloFuncionalidad', (sqlFuncionalidad) =>{
      sqlFuncionalidad.where({'rol_module_id':rolModulo.id,'functionality_id':idFuncionalidad})
    })
    

    if (modulosFuncionalidades.length === 0) {
      return response.status(403).json({
        message: 'No tienes permisos para acceder a esta ruta.2',
      });
    }

    await next();
  }

}
