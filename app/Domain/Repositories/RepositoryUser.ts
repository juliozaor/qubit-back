import { User } from '../Data/Entities/User';
import { PayloadJWT } from '../Dto/PayloadJWT';
import { Pager } from '../Pager';

export interface RepositorioUsuario {
  obtenerUsuarios(param: any): Promise<{usuarios: User[], pagination: Pager}>
  obtenerUsuarioPorId(id: number): Promise<User>
  obtenerUsuarioPorRol(rol: string): Promise<User[]>
  guardarUsuario(usuario: User): Promise<User>
  actualizarUsuario(id: number, usuario: User, payload?:PayloadJWT): Promise<User>
  obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<User | null>
}
