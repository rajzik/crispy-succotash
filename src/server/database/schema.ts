// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hw_a_${name}`);

export const favorites = createTable(
  'favorite',
  {
    id: serial('id').primaryKey(),
    userId: text('userId'),
    postId: text('postId'),
    favorite: boolean('favorite'),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (example) => ({
    userIdIndex: index('user_id_idx').on(example.userId),
  }),
);
