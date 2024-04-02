import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'item_i_group_versions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.integer("itemId")
      table.integer("item_group_id")
      table.integer("project_version_id")

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
