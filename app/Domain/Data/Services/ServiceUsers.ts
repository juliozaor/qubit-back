import { Pager } from "App/Domain/Pager";
import { RepositorioUsuario } from "App/Domain/Repositories/RepositoryUser";
import { User } from "../Entities/User";
import { GeneratePassword } from "App/Domain/GeneratePassword/GeneratePassword";
import { Encriptador } from "App/Domain/Encryption/Encryption";
import { EnviadorEmail } from "App/Domain/Mail/SenderMail";
import { PayloadJWT } from "App/Domain/Dto/PayloadJWT";

export class ServicioUsuarios {  
  constructor(
    private repositorio: RepositorioUsuario,
    private generarContraseña: GeneratePassword,
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail
    ) { }

  async obtenerUsuarios(params: any): Promise<{ usuarios: User[], pagination: Pager }> {
    return this.repositorio.obtenerUsuarios(params);
  }

  async obtenerUsuarioPorId(id: number): Promise<User> {
    return this.repositorio.obtenerUsuarioPorId(id);
  }

  async obtenerUsuarioPorUsuario(nombreUsuario: string): Promise<User | null> {
    return this.repositorio.obtenerUsuarioPorUsuario(nombreUsuario);
  }

  async guardarUsuario(usuario: User, payload:PayloadJWT): Promise<User> {
    if( payload.idRol !== 1 ){
      throw new Error("Usted no tiene autorización para crear usuarios");      
    }
    /* const clave = await this.generarContraseña.generar()
    usuario.clave = await this.encriptador.encriptar(clave) */
    //usuario.id = uuidv4();
    //usuario.usuario = usuario.identificacion.toString()
    const user = this.repositorio.guardarUsuario(usuario);
   /*  await this.enviadorEmail.enviarTemplate<Credenciales>({ 
      asunto: `Bienvenido(a) ${usuario.nombre}`, 
      destinatarios: usuario.correo,
    }, new EmailBienvenida({ clave: clave, nombre: usuario.nombre, usuario: usuario.usuario, logo: Env.get('LOGO') }))
     */

    return user
  }

  async actualizarUsuario(id: number, usuario: User, payload?:PayloadJWT): Promise<User> {
    usuario.password = await this.encriptador.encriptar(usuario.password)
    return this.repositorio.actualizarUsuario(id, usuario, payload);
  }

  async cambiarEstado(id: number): Promise<User> {
    try {
      let usuario = await this.repositorio.obtenerUsuarioPorId(id)
      usuario.state = !usuario.state
      return await this.repositorio.actualizarUsuario(id, usuario);
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
}
