"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetMany } from "../../types"
import AvatarGenerate from "@/components/avatar-generate"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<AgentGetMany[number]>[] = [
    {
        accessorKey: "name",
        header: "Agent",
        cell: ({ row }) => (
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <AvatarGenerate variant="botttsNeutral" seed={row.original.name} />
                    <span className="font-semibold capitalize">{row.original.name}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <CornerDownRightIcon className="text-muted-foreground" />
                    <span>
                        {row.original.instructions}
                    </span>
                </div>
            </div>
        )
    },
    {
        accessorKey: "meetingCount",
        header: "Meetings",
        cell: ({ row }) => (
            <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4">
                <VideoIcon className="text-blue-700" />
                {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
        )
    }

]