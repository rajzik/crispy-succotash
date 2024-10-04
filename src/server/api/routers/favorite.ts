import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { favorites } from '~/server/database/schema';

export const favoriteRouter = createTRPCRouter({
  setFavorite: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        userId: z.string().min(1),
        postId: z.string().min(1),
        favorite: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await (typeof input.id === 'number'
          ? ctx.database
              .update(favorites)
              .set({
                favorite: input.favorite,
              })
              .where(eq(favorites.id, input.id))
          : ctx.database.insert(favorites).values({
              favorite: input.favorite,
              postId: input.postId,
              userId: input.userId,
            }));
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          cause: error,
          message: 'Failed to set favorite',
        });
      }
      return true;
    }),
  getFavorite: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        postId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const result = await ctx.database.query.favorites.findFirst({
          where(favorite, { and, like }) {
            return and(
              like(favorite.userId, input.userId),
              like(favorite.postId, input.postId),
            );
          },
        });

        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          cause: error,
          message: 'Failed to get favorite',
        });
      }
    }),
});
