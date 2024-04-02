import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Infrastructure/Datas/Entity/Users'
import { ROLES } from 'App/Domain/DictionaryAuthorization'

export default class extends BaseSeeder {
  public async run () {
    await Users.createMany([
        {
            name: 'ADMINISTRATOR',
            password: '$bcrypt$v=98$r=10$SVkH7OC3YnSS6r5n+/L+9w$V9CKtEmH282nBDPHb8fa43laPN/dojE', //Super23+
            mail: 'julio.zaor@gmail.com',
            dateBirth: new Date('11/01/1999'),
            document: 99999999,
            roleId: ROLES.ADMINISTRATOR,
            user: '99999999'
        },
        {
          name: 'PROJECT',
          password: '$bcrypt$v=98$r=10$SVkH7OC3YnSS6r5n+/L+9w$V9CKtEmH282nBDPHb8fa43laPN/dojE', //Super23+
          mail: 'julio.jimenez@gmail.com',
          dateBirth: new Date('11/01/1999'),
          document: 11111111,
          roleId: ROLES.PROJECT,
          user: '11111111'
      }
    ])
  }
}
