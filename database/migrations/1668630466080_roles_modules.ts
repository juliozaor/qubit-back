import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles_modules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.integer('rol_id',5).references('id').inTable('roles')
      table.integer('module_id',5).references('id').inTable('modules')
      table.timestamp('created_time', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_time', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
