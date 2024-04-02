import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacionJWT } from 'App/Domain/Data/Services/ServiceJWT'
import JwtInvalidoException from 'App/Exceptions/JwtInvalidoException'

export default class AuthJWT {
  public async handle (contexto: HttpContextContract, next: () => Promise<void>) {
    const cabeceraAutenticacion = contexto.request.header('Authorization')
    if(!cabeceraAutenticacion){
      throw new JwtInvalidoException('Falta el token de autenticación')
    }
    ServicioAutenticacionJWT.verificarToken(cabeceraAutenticacion)
    await next()
  }
}
