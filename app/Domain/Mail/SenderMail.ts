import { ConfiguracionEmail } from "./ConfigurationMail"
import { Email } from "./Mail"

export interface EnviadorEmail {
  enviarEmail(asunto:string, texto:string, destinatarios:string[], etiquetas?:string[]):void
  enviarTemplate<T>(configuracion:ConfiguracionEmail, email:Email<T>):void
}
