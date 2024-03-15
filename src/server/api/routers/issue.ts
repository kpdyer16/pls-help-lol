import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


const statusRegex = /new|in progress|resolved/;

export const issueRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  
  getIssues: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        direction: z.enum(['forward', 'backward']), // optional, useful for bi-directional query
        constraint: z.object({ status: z.string().regex(statusRegex) }).optional(),
      }),
    )
    .query(async ({ ctx, input}) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const { constraint } = input;
      const items = await ctx.db.issue.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          status: constraint?.status,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.issue.create({
        data: {
          title: input.title,
          description: input.description,
          email: input.email,
          status: "new",
        },
      });
    }),

  updateStatus: publicProcedure
    .input(z.object({ 
      id: z.number().int(),
      status: z.string().regex(statusRegex), 
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.issue.update({
        data: {
          status: input.status
        },
        where: {
          id: input.id,
        },
      });
    }),

  getIssueById: publicProcedure
    .input(z.object({
      id: z.number().int(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.issue.findFirst({
        where: {
          id: input.id
        },
      })
    }),


  getResponses: publicProcedure
    .input(z.object({
      id: z.number().int(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.issueResponse.findMany({
        where: {
          issueId: input.id
        },
        orderBy: {
          createdAt: 'asc',
        }
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.issue.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
