import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { environment } from '~/environment';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDatabase = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

export const client =
  globalForDatabase.client ?? postgres(environment.DATABASE_URL);
if (environment.NODE_ENV !== 'production') {
  globalForDatabase.client = client;
}

export const database = drizzle(client, { schema });
