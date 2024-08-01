import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_id').unsigned().nullable().references('id').inTable('categories').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category_id')
    })
  }
}
