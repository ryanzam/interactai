import { AppRouter } from "@/trpc/router/_app";
import { inferRouterOutputs } from "@trpc/server";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"]
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"]