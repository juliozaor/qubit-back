import { DateTime } from 'luxon'
import { Module } from './Module'

export class Rol {
  private _modules:Module[] = []

  constructor (
    private _id: number,    
    private _name: string, 
    private _root: boolean = false, 
    private _state: boolean = true,
    private _createdTime: DateTime = DateTime.now(), 
    private _updatedTime: DateTime = DateTime.now()

  ){
  }

  public get id (){
    return this._id
  }

  public get name (){
    return this._name
  }

  public get modules (){
    return this._modules
  }

  public get root (){
    return this._root
  }

  public get state (){
    return this._state
  }

  public get createdTime (){
    return this._createdTime
  }

  public get updatedTime (){
    return this._updatedTime
  }

  public addModule (module:Module):this{
    this._modules.push(module)
    return this
  }
}
