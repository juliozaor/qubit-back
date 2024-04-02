import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projects";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.string("code", 50)
      table.string("name", 200)
      table.string("subtitle", 200)
      table.integer("preparedby_client_id")
      table.integer("preparedby_user_id")
      table.integer("client_id")
      table.integer("created_user_id")
      table.integer("updated_user_id")
      table.integer("type_project_id")
      table.integer("type_application_id")
      table.integer("project_status_id")
      table.integer("conceptnet_draw_id")
      table.string("basepath", 255)
      table.integer("projectversion_id")
      table.integer("status_id").defaultTo(1)
      table.integer("user_id")
      table.timestamp("created_time", { useTz: true }).defaultTo(this.now())
      table.timestamp("updated_time", { useTz: true }).defaultTo(this.now())
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
