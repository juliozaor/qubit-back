import { Rol } from "App/Domain/Data/Entities/Authorization/Rol";
import { ModuleDto } from "./ModuleDto";

export class RolDto{
    public name
    public id
    public modules: ModuleDto[]
    
    constructor(rol: Rol){
        this.name = rol.name
        this.id = rol.id
        this.modules = rol.modules.map( module => new ModuleDto( module ))
    }
}