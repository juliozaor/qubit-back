import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "project_versions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.integer("project_id")
      table.string("version", 20)
      table.integer("preparedby_client_id")
      table.integer("preparedby_user_id")
      table.integer("created_user_id")
      table.integer("updated_user_id")
      table.integer("conceptnet_draw_id")

      table.dateTime("revised_date")
      table.text("executive_summary")
      table.text("scope_work")
      table.text("trading_conditions")
      table.text("comment_clarifications")
      table.text("payment_terms")
      table.string("quote_path", 255)
      table.string("quote_name", 255)

      table.integer('status_id').defaultTo(1)
      table.integer('user_id')
      table.timestamp("created_time", { useTz: true }).defaultTo(this.now())
      table.timestamp("updated_time", { useTz: true }).defaultTo(this.now())
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
