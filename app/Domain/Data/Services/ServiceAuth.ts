
import { GeneratePassword } from 'App/Domain/GeneratePassword/GeneratePassword'
import { ServicioUsuarios } from './ServiceUsers'
import { ServicioAutenticacionJWT } from 'App/Domain/Data/Services/ServiceJWT'
import { Exception } from '@adonisjs/core/build/standalone'
import { RespuestaInicioSesion } from 'App/Domain/Dto/ResponseLoginSession'
import { User } from '../Entities/User'
import { Encriptador } from 'App/Domain/Encryption/Encryption'
import { RepositoryAuth } from 'App/Domain/Repositories/RepositoryAuth'
import { RepositorioUsuario } from 'App/Domain/Repositories/RepositoryUser'
import { EnviadorEmail } from 'App/Domain/Mail/SenderMail'
import { RolDto } from 'App/Presentation/Auth/Dtos/RolDto'
import ActiveDirectoryService from 'App/Infrastructure/Services/ActiveDirectoryService'
import Env from '@ioc:Adonis/Core/Env';

export class ServicioAutenticacion {
  private servicioUsuario: ServicioUsuarios
  private activeDirectoryService = new ActiveDirectoryService();
  constructor(
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail,
    private repositoryAuth: RepositoryAuth,
    private repositorioUsuario: RepositorioUsuario,
  ) {
    this.servicioUsuario = new ServicioUsuarios(
      this.repositorioUsuario,
      new GeneratePassword(),
      this.encriptador,
      this.enviadorEmail
    )
  }

  public async cambiarClave(identificacion: string, clave: string, nuevaClave: string) {
    const usuario = await this.verificarUsuario(identificacion)
    if (usuario instanceof User) {
      if (!(await this.encriptador.comparar(clave, usuario.password))) {
        throw new Exception('Credenciales incorrectas', 400)
      }
      usuario.password = nuevaClave
      usuario.temporaryPassword = false;
      this.servicioUsuario.actualizarUsuario(usuario.id, usuario)
      return;
    }
    throw new Exception('Credenciales incorrectas', 400)
  }

  public async iniciarSesion(usuario: string, contrasena: string): Promise<RespuestaInicioSesion> {
    const usuarioVerificado = await this.verificarUsuario(usuario)
    /* let registroDeBloqueo = await this.repositorioBloqueo.obtenerRegistroPorUsuario(usuarioVerificado.identificacion)
    if (!registroDeBloqueo) {
      registroDeBloqueo = await this.crearRegistroDeBloqueo(usuarioVerificado.identificacion)
    }
    if (registroDeBloqueo.elUsuarioEstaBloqueado()) {
          throw new Exception('El usuario se encuentra bloqueado por exceder el número de intentos de inicio de sesión, intente recuperar contraseña', 423)
    } */
    
    if (!usuarioVerificado) {
      /* this.manejarIntentoFallido(registroDeBloqueo) */
      
          throw new Exception('Usuario no registrado en el sistema, valide el acceso con el administrador', 400)
    }


    let isAuthenticated = true;
    try {
      // Autenticar al usuario en Active Directory
      if (Env.get('DIRACT') == 1) {
        isAuthenticated = await this.activeDirectoryService.authenticate(usuario, contrasena);        
      }
      
    } catch (error) {
      // Manejar errores     
      
      throw new Exception(error.lde_message, 400)
    }

    if (!isAuthenticated) {
      
      throw new Exception('Credenciales incorrectas', 400)
    }
    


    const rolUsuario = await this.repositoryAuth.getRoleWithModulesAndPermissions(usuarioVerificado.roleId)
    const token = ServicioAutenticacionJWT.generarToken({
      id: usuarioVerificado.id,
      idRol: usuarioVerificado.roleId
    })


   
    return new RespuestaInicioSesion(
      {
        id: usuarioVerificado.id,
        usuario: usuarioVerificado.user,
        nombre: usuarioVerificado.name,
        apellido: usuarioVerificado.lastname,
        telefono: usuarioVerificado.phone,
        correo: usuarioVerificado.mail
      },
      token,
      new RolDto(rolUsuario),
      usuarioVerificado.temporaryPassword)
  }

  public async verificarUsuario(usuario: string): Promise<User> {
    const usuarioDB = await this.servicioUsuario.obtenerUsuarioPorUsuario(usuario)
    if (!usuarioDB) {
      throw new Exception('Credenciales incorrectas!', 400)
    }
    return usuarioDB
  }



}
