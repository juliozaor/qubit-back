import { Exception } from '@adonisjs/core/build/standalone'
import { EnviadorEmail } from 'App/Domain/Mail/SenderMail'
import { GeneratePassword } from 'App/Domain/GeneratePassword/GeneratePassword'
import { User } from '../Entities/User'
import { ServicioUsuarios } from './ServiceUsers'
import Env from '@ioc:Adonis/Core/Env'
import { EmailRecuperacionContrasena } from 'App/Domain/Mail/Mails/PasswordRecovery'

export class ServicioEmail{
  constructor (
    private enviadorEmail: EnviadorEmail, 
    private generarContrasena: GeneratePassword, 
    private servicioUsuarios: ServicioUsuarios
    ) { }

  public async ComprobarUsuario (usuario: string, correo: string) {
    const usuarioVerificado = await this.verificarUsuario(usuario)
    if (!usuarioVerificado) {
      throw new Exception('usuario no encontrado y/o correo incorrecto (error: 001)', 400)
    //  throw new Exception('No se encuentra usuario registrado', 400)
    }
    if (usuarioVerificado.mail.toLowerCase() !== correo.toLowerCase()) {
     //throw new Exception('El email ingresado no coincide con el del usuario', 400)
      throw new Exception('usuario no encontrado y/o correo incorrecto, (error: 002)', 400)
    }
    const clave = await this.generarContrasena.generate()
    
    usuarioVerificado.password = clave
    usuarioVerificado.temporaryPassword = true 

    if (usuarioVerificado instanceof User) {
      await this.servicioUsuarios.actualizarUsuario(usuarioVerificado.id, usuarioVerificado)      
    }

    await this.enviadorEmail.enviarTemplate({
      asunto: 'Recuperar contraseña.',
      destinatarios: usuarioVerificado.mail,
      de: Env.get('SMTP_USERNAME')
    }, new EmailRecuperacionContrasena({
      nombre: usuarioVerificado.name,
      clave: clave,
      usuario: usuarioVerificado.document,
      logo: Env.get('LOGO')
    }))
  }

  public async verificarUsuario (usuario: string): Promise< User> {
   
      const usuarioDB = await this.servicioUsuarios.obtenerUsuarioPorUsuario(usuario)
      if(!usuarioDB){
        throw new Exception('usuario no encontrado y/o correo incorrecto, (error: 001)', 400)
       // throw new Exception('No se encuentra usuario registrado', 400)
      }
      return usuarioDB
   
  }
}
