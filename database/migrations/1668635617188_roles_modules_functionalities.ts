import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles_modules_functionalities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rol_module_id').references('id').inTable('roles_modules')
      table.integer('functionality_id', 5).references('id').inTable('functionalities')
      table.timestamp('created_time', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_time', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
