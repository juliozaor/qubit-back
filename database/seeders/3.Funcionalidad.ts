import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Functionalities from 'App/Infrastructure/Datas/Entity/Authorization/Functionalities'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await Functionalities.createMany([
      {
        id: 1,
        name: 'create',
        state: true,
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },
      {
        id: 2,
        name: 'read',
        state: true,
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },
      {
        id: 3,
        name: 'update',
        state: true,
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },
      {
        id: 4,
        name: 'delete',
        state: true,
        createdTime: DateTime.now(),
        updatedTime: DateTime.now(),
      },
    ])
  }
}
