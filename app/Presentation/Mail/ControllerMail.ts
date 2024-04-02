/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEmail } from 'App/Domain/Data/Services/ServiceMail'
import { ServicioUsuarios } from 'App/Domain/Data/Services/ServiceUsers'
import { GeneratePassword } from 'App/Domain/GeneratePassword/GeneratePassword'
import { EnviadorEmailAdonis } from 'App/Infrastructure/Mail/SenderEmailAdonis'
import { EncriptadorAdonis } from 'App/Infrastructure/Encryption/EncryptorAdonis'

import { RepositoryUserDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryUserDB';

export default class ControladorEmail {
  private service: ServicioEmail
  constructor () {
    this.service = new ServicioEmail (
      new EnviadorEmailAdonis(), 
      new GeneratePassword(), 
      new ServicioUsuarios(
        new RepositoryUserDB(),
        new GeneratePassword(), 
        new EncriptadorAdonis(),
        new EnviadorEmailAdonis()
      )
    )
  }

  public async EnviarEmail ({request, response}:HttpContextContract) {
      const peticion = request.all()
      let usuario = peticion['usuario']
      let correo = peticion['correo']
      await this.service.ComprobarUsuario(usuario, correo)
      response.status(200).send({mensaje: 'Mensaje enviado correctamente'})
   
  }
}

