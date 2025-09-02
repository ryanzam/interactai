import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

import { eq, and, sql, getTableColumns, ilike, desc, count } from "drizzle-orm"
import { TRPCError } from "@trpc/server";
import { DEFAULT_PAGE, DEFAULT_PAGESIZE, MAX_PAGESIZE, MIN_PAGESIZE } from "@/constants";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schema";

export const meetingsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {

            const [existingMeeting] = await db.select({
                ...getTableColumns(meetings)
            })
                .from(meetings)
                .where(and(
                    eq(meetings.id, input.id),
                    eq(meetings.userId, ctx.auth.user.id) 
                ))

            if (!existingMeeting) throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" })

            return existingMeeting
        }),
    getMany: protectedProcedure.input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGESIZE).max(MAX_PAGESIZE).default(DEFAULT_PAGESIZE),
        search: z.string().nullish()
    }))
        .query(async ({ input, ctx }) => {
            const { page, pageSize, search } = input
            const data = await db.select({
                ...getTableColumns(meetings),
                agent: agents,
                duration: sql<number> `EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")
            }).from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined
                )).orderBy(desc(meetings.createdAt), desc(meetings.id))
                .offset((page - 1) * pageSize)

            const [total] = await db.select({ count: count() })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined
                ))

            const totalPages = Math.ceil(total.count / pageSize)

            return {
                items: data,
                total: total.count,
                totalPages
            }
        }),
    create: protectedProcedure.input(meetingsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db.insert(meetings)
                .values({ ...input, userId: ctx.auth.user.id })
                .returning()

            return createdMeeting
        }),
    update: protectedProcedure.input(meetingsUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedMeeting] = await db.update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                ).returning()

            if (!updatedMeeting) throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
            return updatedMeeting
        })
})