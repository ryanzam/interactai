"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import AgentHeader from '../components/agent-header'
import AvatarGenerate from '@/components/avatar-generate'
import { Badge } from '@/components/ui/badge'
import { VideoIcon } from 'lucide-react'

interface AgentViewProps {
    agentId: string
}

export const AgentView = ({ agentId }: AgentViewProps) => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }))

    return (
        <div className='flex-1 p-4'>
            <AgentHeader agentId={agentId}
                agentName={data.name}
                onEdit={() => { }}
                onRemove={() => { }} />

            <div className="bg-white border rounded-lg">
                <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                    <div className="flex items-center gap-x-3">
                        <AvatarGenerate seed={data.name} variant='botttsNeutral' className='size-10' />
                        <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>

                    <Badge variant={"outline"} className='text-blue-600'>
                        <VideoIcon /> {`4 meetings`}
                    </Badge>
                    <div>
                        <p className='text-lg font-medium'>Instructions</p>
                        <p className='text-neutral-700'>{data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AgentViewLoadingComponent = () => {
    return (
        <LoadingComponent title='Agents loading...' description='Please wait...' />
    )
}

export const AgentViewErrorComponent = () => {
    return (
        <ErrorComponent title='Error loading agents...' description='Please try later...' />
    )
}

