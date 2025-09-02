import { AppRouter } from "@/trpc/router/_app";
import { inferRouterOutputs } from "@trpc/server";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"]["items"]