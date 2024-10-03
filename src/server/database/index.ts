import type { Client } from '@libsql/client';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { environment } from '~/environment';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDatabase = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDatabase.client ?? createClient({ url: environment.DATABASE_URL });
if (environment.NODE_ENV !== 'production') {
  globalForDatabase.client = client;
}

export const database = drizzle(client, { schema });
