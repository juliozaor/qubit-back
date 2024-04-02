import { Functionality } from "App/Domain/Data/Entities/Authorization/Functionality"

export class FunctionalityDto{
    public id: number
    public name: string
    public state: boolean

    constructor(Functionality: Functionality){
        this.id = Functionality.id
        this.name = Functionality.name
        this.state = Functionality.state
    }
}