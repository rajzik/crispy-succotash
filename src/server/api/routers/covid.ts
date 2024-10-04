import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

const infectedSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      theme: z.string(),
      sub_theme: z.string(),
      topic: z.string(),
      geography_type: z.string(),
      geography: z.string(),
      geography_code: z.string(),
      metric: z.string(),
      metric_group: z.string(),
      stratum: z.string(),
      sex: z.string(),
      age: z.string(),
      year: z.number(),
      month: z.number(),
      epiweek: z.number(),
      date: z.string(),
      metric_value: z.number(),
      in_reporting_delay_period: z.boolean(),
    }),
  ),
});

export const covidRouter = createTRPCRouter({
  infections: publicProcedure.query(async ({}) => {
    const response = await fetch(
      'https://api.ukhsa-dashboard.data.gov.uk/v2/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_cases_casesByDay?epiweek=1&page_size=1024&year=2024',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const parseResult = infectedSchema.safeParse(await response.json());

    if (parseResult.success === false) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: parseResult.error,
        message: 'Failed to parse response',
      });
    }

    return parseResult.data?.results.map(({ date, metric_value }) => ({
      date,
      infected: metric_value,
    }));
  }),
  variants: publicProcedure.query(async ({}) => {
    const response = await fetch(
      'https://api.ukhsa-dashboard.data.gov.uk/v2/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_cases_lineagePercentByWeek?epiweek=1&page_size=1024&year=2024',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const parseResult = infectedSchema.safeParse(await response.json());

    if (parseResult.success === false) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: parseResult.error,
        message: 'Failed to parse response',
      });
    }

    return parseResult.data?.results.map(({ stratum, metric_value }) => ({
      variant: stratum,
      percent: metric_value / 100,
    }));
  }),
});
