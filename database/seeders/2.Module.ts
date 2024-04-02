import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Modules from 'App/Infrastructure/Datas/Entity/Authorization/Modules'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {
    await Modules.createMany([
      {
        id: 1,
        name: 'users',
        displayName: 'Users Management',
        state: true,
        order:1,
        path:'/usuarios',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },
      {
        id: 2,
        name: 'Project',
        displayName: 'Project',
        state: true,
        order:2,
        path:'/Project',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 3,
        name: 'Project Version',
        displayName: 'Project Version',
        state: true,
        order:3,
        path:'formulario/gestionar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 4,
        name: 'Items',
        displayName: 'Items',
        state: true,
        order:4,
        path:'formulario/validar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 5,
        name: 'Items Group',
        displayName: 'Items Group',
        state: true,
        order:4,
        path:'formulario/validar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 6,
        name: 'Client',
        displayName: 'Client',
        state: true,
        order:4,
        path:'formulario/validar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 7,
        name: 'Concept Draw',
        displayName: 'Concept Draw',
        state: true,
        order:4,
        path:'formulario/validar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },{
        id: 8,
        name: 'Graphic Editor',
        displayName: 'editor',
        state: true,
        order:4,
        path:'formulario/validar',
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      }       

    ])
  }
}
