import { DateTime } from "luxon"

export class Functionality {
    public constructor(
        private _id: number,
        private _name: string,
        private _state: boolean = true,
        private _createdTime: DateTime = DateTime.now(),
        private _updatedTime: DateTime = DateTime.now()
    ){}

    public get id(){
        return this._id
    }

    public get name(){
        return this._name
    }

    public get state(){
        return this._state
    }

    public get createdTime(){
        return this._createdTime
    }

    public get updatedTime(){
        return this._updatedTime
    }
}
