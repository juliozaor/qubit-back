import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'item_i_groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer("item_id")
      table.integer("item_group_id")
      table.float("price_unit").defaultTo(0)
      table.integer("number_unit").defaultTo(0)
      table.float("price_total").defaultTo(0)
      table.float("tax").defaultTo(0)

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
