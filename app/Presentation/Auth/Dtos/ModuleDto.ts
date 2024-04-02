import { FunctionalityDto } from "./FunctionalityDto"
import { Module } from "App/Domain/Data/Entities/Authorization/Module"

export class ModuleDto{
    public id: number
    public name: string
    public path: string
    public icon: string
    public parametro: string
    public functionality: FunctionalityDto[]

    constructor(module: Module){
        this.id = module.id
        this.name = module.name
        this.path = module.path
        this.icon = module.icon
        this.functionality = module.functionality.map( functionality => new FunctionalityDto(functionality))
    }
}