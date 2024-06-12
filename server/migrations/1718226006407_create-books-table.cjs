/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("books", {
    id: "id",
    userId: { type: "integer", notNull: true },
    title: { type: "varchar(64)", notNull: true },
    author: { type: "varchar(64)", notNull: true },
    description: { type: "text", notNull: true },
    status: {
      type: "bool",
      notNull: true,
      default: false,
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
    },
  });

  pgm.addConstraint("books", "book_user_fk", {
    foreignKeys: {
      columns: "userId",
      references: "users(id)",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("books");
};
