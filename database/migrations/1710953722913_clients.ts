import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("names", 255);
      table.string("surnames", 255);
      table.string("email", 255);

      table.timestamp("created_time", { useTz: true }).defaultTo(this.now());
      table.timestamp("updated_time", { useTz: true }).defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
