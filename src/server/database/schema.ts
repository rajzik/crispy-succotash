// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `hw_${name}`);

export const favorites = createTable(
  'favorite',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: text('userId', { length: 256 }),
    postId: text('postId', { length: 256 }),
    favorite: int('favorite', { mode: 'boolean' }),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    userIdIndex: index('user_id_idx').on(example.userId),
  }),
);
