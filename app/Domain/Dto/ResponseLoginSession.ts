/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RolDto } from 'App/Presentation/Auth/Dtos/RolDto'

export class RespuestaInicioSesion {

  constructor(
    public readonly usuario: {
      id: number,
      usuario: string,
      nombre?: string,
      apellido?: string,
      telefono?: string,
      correo?: string,
    },
    public readonly token: string,
    public readonly rol: RolDto,
    public readonly claveTemporal: boolean
  ) { }
}
