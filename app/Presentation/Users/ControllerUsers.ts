/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioUsuarios } from 'App/Domain/Data/Services/ServiceUsers'
import { GeneratePassword } from 'App/Domain/GeneratePassword/GeneratePassword'
import { EncriptadorAdonis } from 'App/Infrastructure/Encryption/EncryptorAdonis'
import { RepositoryUserDB } from '../../Infrastructure/Implementation/Lucid/RepositoryUserDB'
import { EnviadorEmailAdonis } from 'App/Infrastructure/Mail/SenderEmailAdonis'

export default class ControladorUsuario {
  private service: ServicioUsuarios
  constructor () {
    this.service = new ServicioUsuarios(
      new RepositoryUserDB(), 
      new GeneratePassword(), 
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis()
    )
  }

  public async listar ({ request }:HttpContextContract) {
    const usuarios = await this.service.obtenerUsuarios(request.all())
    return usuarios
  }

  public async obtenerUsuarioPorId ({ params }) {
    const usuario = await this.service.obtenerUsuarioPorId(params.id)
    return usuario
  }

  public async obtenerUsuarioPorUsuario ({ request }:HttpContextContract) {
    const usuario = await this.service.obtenerUsuarioPorUsuario(request.param('usuario'))
    return usuario
  }

  public async actualizarUsuario ({ params, request }) {
    const payload = await request.getPayloadJWT()
    const dataUsuario = request.all()    
    const usuario = await this.service.actualizarUsuario(params.id, dataUsuario, payload)
    return usuario
  }

  public async guardarUsuario ({ request }) {
    const dataUsuario = request.all()
    const payload = await request.getPayloadJWT()
    const usuario = await this.service.guardarUsuario(dataUsuario, payload)
    return usuario
  }

  public async cambiarEstado ({request, response}:HttpContextContract){
    try{      
      let id = request.param('id')
      await this.service.cambiarEstado(id)
      response.status(200).send('Cambio realizado correctamente')
    } catch (e) {
      response.status(200).send(e)
    }
  }
}
