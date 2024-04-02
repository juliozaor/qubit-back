import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioUsuario } from "App/Domain/Data/Services/ServiceUser";
import { RepositoryUserDB } from "App/Infrastructure/Implementation/Lucid/RepositoryUserDB";

export default class ControladorUsuario {
    private servicio = new ServicioUsuario(new RepositoryUserDB())

    async actualizarUsuario({ request, response }: HttpContextContract) {
        const identificacion = request.param('identificacion')
        //const payload = await request.validate({ schema: validarActualizarUsuario })
        const usuario = await this.servicio.actualizarInformacionUsuario(request.all(), identificacion)
        response.status(200).send(usuario)
    }


}