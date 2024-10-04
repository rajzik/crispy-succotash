import type { Config } from 'drizzle-kit';

import { environment } from '~/environment';

export default {
  schema: './src/server/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: environment.DATABASE_URL,
  },
  tablesFilter: ['hw_a*'],
} satisfies Config;
