import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import z from "zod";

import { eq, and, sql, getTableColumns, ilike, desc, count } from "drizzle-orm"
import { TRPCError } from "@trpc/server";
import { DEFAULT_PAGE, DEFAULT_PAGESIZE, MAX_PAGESIZE, MIN_PAGESIZE } from "@/constants";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {

            const [existingAgent] = await db.select({
                meetingCount: sql<number> `4`,
                ...getTableColumns(agents)
            })
                .from(agents)
                .where(and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                ))

            if (!existingAgent) throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" })

            return existingAgent
        }),
    getMany: protectedProcedure.input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGESIZE).max(MAX_PAGESIZE).default(DEFAULT_PAGESIZE),
        search: z.string().nullish()
    }))
        .query(async ({ input, ctx }) => {
            const { page, pageSize, search } = input
            const data = await db.select({
                meetingCount: sql<number> `4`,
                ...getTableColumns(agents)
            }).from(agents)
                .where(and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                )).orderBy(desc(agents.createdAt), desc(agents.id))
                .offset((page - 1) * pageSize)

            const [total] = await db.select({ count: count() })
                .from(agents)
                .where(and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                ))

            const totalPages = Math.ceil(total.count / pageSize)

            return {
                items: data,
                total: total.count,
                totalPages
            }
        }),
    create: protectedProcedure.input(agentsInsertSchema)
        .input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db.insert(agents)
                .values({ ...input, userId: ctx.auth.user.id })
                .returning()

            return createdAgent
        })

})