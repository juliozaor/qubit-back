import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Infrastructure/Datas/Entity/Authorization/Roles'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await Roles.createMany([
      {
        id: 1,
        name: 'ADMINISTRATOR',
        state: true,
        updatedTime: DateTime.now(),
        createdTime: DateTime.now(),
      },
      {
        id: 2,
        name: 'COMMERCIAL',
        state: true,
        updatedTime: DateTime.now(),
        createdTime: DateTime.now(),
      },
      {
        id: 3,
        name: 'MASTERS',
        state: true,
        updatedTime: DateTime.now(),
        createdTime: DateTime.now(),
      },
      {
        id: 4,
        name: 'PROJECT',
        state: true,
        updatedTime: DateTime.now(),
        createdTime: DateTime.now(),
      }

    ])
  }
}
