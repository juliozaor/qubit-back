import { Email } from "../Mail";
import { Credenciales } from "../Models/Credentials";

export class EmailBienvenida implements Email<Credenciales>{
    private readonly _modelo: Credenciales
    private readonly _rutaTemplate: string = "app/Domain/Email/Templates/bienvenida.edge"

    constructor(modelo: Credenciales) {
        this._modelo = modelo
     }

    get rutaTemplate(): string {
        return this._rutaTemplate
    }

    get modelo(): Credenciales {
        return this._modelo
    }
}