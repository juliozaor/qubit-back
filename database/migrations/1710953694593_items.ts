import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code',50)
      table.string('name',200)
      table.text('description')
      table.integer('type_item_id')
      table.float('base_price').defaultTo(0)
      table.float('base_tax').defaultTo(0)
      table.integer('type_unit_id')

      table.integer('status_id').defaultTo(1)
      table.integer('user_id')
      table.timestamp("created_time", { useTz: true }).defaultTo(this.now())
      table.timestamp("updated_time", { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
