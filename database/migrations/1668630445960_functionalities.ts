import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'functionalities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id', 5).primary()
      table.string('name', 30)
      table.boolean('state').defaultTo(true)
      table.timestamp('created_time', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_time', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
