
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblUsuarios extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique()
       table.string('name', 200).notNullable()
       table.string('lastname', 255)
       table.bigInteger('document').unique()
       table.string('user', 255)
       table.string('password', 255)
       table.boolean('temporary_password').defaultTo(true)
       table.date('dateBirth')
       table.string('phone', 255)
       table.string('mail', 255)
       table.integer('role_id',5).references('id').inTable('roles')
       table.boolean('state').defaultTo(true)
       table.timestamp('created_time', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_time', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
