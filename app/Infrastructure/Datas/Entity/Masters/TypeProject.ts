import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TypeProject } from 'App/Domain/Data/Entities/Masters/TypeProject';

export default class TblTypeProject extends BaseModel {
  public static readonly table = 'type_projects';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateTypeProject (typeProject: TypeProject) {
    this.id = typeProject.id
    this.name = typeProject.name
  }

  public setTypeProject (typeProject: TypeProject) {
    this.id = typeProject.id
    this.name = typeProject.name
  }

  public getTypeProject(): TypeProject {
    const typeProject = new TypeProject();
    typeProject.id = this.id
    typeProject.name = this.name
    return typeProject;
  }
  
}