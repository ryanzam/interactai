import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import z from "zod";

import { eq, and } from "drizzle-orm"
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {

            const [existingAgent] = await db.select()
                .from(agents)
                .where(and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                ))

                if(!existingAgent) throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found"})

            return existingAgent
        }),
    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents)

        return data
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