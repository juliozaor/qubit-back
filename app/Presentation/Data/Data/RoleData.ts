import { Module } from 'App/Domain/Data/Entities/Authorization/Module'
import { DateTime } from 'luxon'

export class RolDatos {
  public id: number
  public name: string
  public state: boolean = true
  public createdTime: DateTime = DateTime.now()
  public updatedTime: DateTime = DateTime.now()
  public modules:Module[] = []
}
