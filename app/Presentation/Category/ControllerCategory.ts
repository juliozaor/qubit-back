/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceCategory } from 'App/Domain/Data/Services/ServiceCategory';
import { RepositoryCategoryDB } from 'App/Infrastructure/Implementation/Lucid/RepositoryCategoryDB';
import { CategoryValidationRules } from 'App/Validators/categoryValidationRules';

export default class ControllerCategory {
 
  private service: ServiceCategory
  constructor () {
    this.service = new ServiceCategory(new RepositoryCategoryDB())
  }


  public async getCategories ({response, request}:HttpContextContract){
      const categories = await this.service.getCategories(request.all())
      return response.status(200).send(categories);
  }
  public async getCategory ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Category id is necessary'});
    }
    const Category = await this.service.getCategory(id)
      return response.status(200).send(Category);
  }

 
  public async setCategory ({response, request}:HttpContextContract){
    try {      

      const categoryIn = await request.validate({ schema: CategoryValidationRules })
      const category = await this.service.setCategory(categoryIn)
      return response.created(category)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async updateCategoryAll ({response, request}:HttpContextContract){
    try {      
      const categoryIn = await request.validate({ schema: CategoryValidationRules })
      const category = await this.service.updateCategoryAll(categoryIn)
      return response.created(category)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async deleteCategory ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'The Category id is necessary'});
    }
    await this.service.deleteCategory(id)
    return response.status(200).send({message:'Category successfully removed'});
  
  }

  
}
