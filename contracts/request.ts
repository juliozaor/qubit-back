import { PayloadJWT } from "App/Domain/Dto/PayloadJWT";

declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
        getPayloadJWT(): Promise<PayloadJWT>
    }
  }