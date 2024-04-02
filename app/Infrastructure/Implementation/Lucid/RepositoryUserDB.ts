
import { Pager } from 'App/Domain/Pager';
import { PaginationMapperDB } from './PaginationMapperDB';
import { RepositorioUsuario } from 'App/Domain/Repositories/RepositoryUser';
import { User } from 'App/Domain/Data/Entities/User';
import TblUsuarios from 'App/Infrastructure/Datas/Entity/Users';

import { PayloadJWT } from '../../../Domain/Dto/PayloadJWT';
export class RepositoryUserDB implements RepositorioUsuario {
  async obtenerUsuarios (params: any): Promise<{usuarios: User[], pagination: Pager}> {
    const usuarios: User[] = []
    const { rol, termino, pagina, limite } = params;

    

    const consulta = TblUsuarios.query().where('role_id','<>','010')
    if (rol) {
      consulta.where('role_id', rol)
    }
if(termino){
  consulta.andWhere((subquery) => {
    subquery.whereRaw("LOWER(mail) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(lastname) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(document) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(user) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
  });
}
    

    const usuariosDB = await consulta.orderBy('name', 'asc').paginate(pagina, limite)

    usuariosDB.forEach(usuariosDB => {
      usuarios.push(usuariosDB.obtenerUsuario())
    })
    const pagination = PaginationMapperDB.getPager(usuariosDB)
    return {usuarios , pagination}
  }

  async obtenerUsuarioPorId (id: number): Promise<User> {
    const usuario = await TblUsuarios.findOrFail(id)
    return usuario.obtenerUsuario()
  }

  async obtenerUsuarioPorRol (rol: string): Promise<User[]> {
    const usuarios: any[] = []
    const usuariosDB = await TblUsuarios.query().where('role_id', rol).orderBy('id', 'desc')
    usuariosDB.forEach(usuarioDB => {

      /* usuarios.push(usuariosDB.obtenerUsuario()) */
      usuarios.push({
      //  id: usuarioDB.id,
        nombre: usuarioDB.name,
        identificacion: usuarioDB.document
      })
    })
    return usuarios
  }

  async obtenerUsuarioPorUsuario (nombreUsuario: string): Promise<User | null>{
    //const usuario = await TblUsuarios.query().where('identificacion', '=', nombreUsuario).first()
    const usuario = await TblUsuarios.query().where('user', '=', nombreUsuario).first()
    if(usuario){
      return usuario.obtenerUsuario()
    }
    return null
  }

  async guardarUsuario (usuario: User): Promise<User> {
    let usuarioDB = new TblUsuarios()
    usuarioDB.establecerUsuarioDb(usuario)
    await usuarioDB.save()
    return usuarioDB
  }

  async actualizarUsuario (id: number, usuario: User, payload?:PayloadJWT): Promise<User> {
    let usuarioRetorno = await TblUsuarios.findOrFail(id)
   /*  const usuarioAnterior = usuarioRetorno; */
   //console.log(usuario);
   
    
    usuarioRetorno.establecerUsuarioDb(usuario)
    await usuarioRetorno.save()
    

    return usuarioRetorno
  }

 

}
