import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioAutenticacion } from "App/Domain/Data/Services/ServiceAuth";
import { EnviadorEmailAdonis } from "App/Infrastructure/Mail/SenderEmailAdonis";
import { EncriptadorAdonis } from "App/Infrastructure/Encryption/EncryptorAdonis";
import { RepositoryAuthDB } from "App/Infrastructure/Implementation/Lucid/RepositoryAuthDB";
import { RepositoryUserDB } from "App/Infrastructure/Implementation/Lucid/RepositoryUserDB";

export default class ControllerAuth {
  private service: ServicioAutenticacion;  
  constructor() {
    this.service = new ServicioAutenticacion(
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis(),
      new RepositoryAuthDB(),
      new RepositoryUserDB()
    );
  }

  public async login({ request, response }: HttpContextContract) {
    const peticion = request.all();
    const usuario = peticion["usuario"];
    const contrasena = peticion["contrasena"];

    try {
      const datos = await this.service.iniciarSesion(usuario, contrasena);
      return datos;
      
    } catch (error) {
      throw new Error(error.message);
      
    }

   
  }


  public async cambiarClave({ request, response }: HttpContextContract) {
    const peticion = await request.body();
    const identificacion = peticion.identificacion;
    const clave = peticion.clave;
    const nuevaClave = peticion.nuevaClave;

    await this.service.cambiarClave(identificacion, clave, nuevaClave);
    response.status(200).send({
      mensaje: "Su contraseña ha sido cambiada exitosamente",
      estado: 200,
    });
  }
}
