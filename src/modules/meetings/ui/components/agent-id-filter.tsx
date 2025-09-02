import React, { useState } from 'react'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import CommandSelect from '@/components/command-select'
import AvatarGenerate from '@/components/avatar-generate'

export const AgentIdFilter = () => {

    const [filters, setFilters] = useMeetingsFilters()
    const [agentSearch, setAgentSearch] = useState("")
    const trpc = useTRPC()

    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100, search: agentSearch
        })
    )


    return (
        <CommandSelect
            className='h-10'
            placeholder='Agent'
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className='flex items-center gap-x-2'>
                        <AvatarGenerate seed={agent.name} variant='botttsNeutral' className='size-4' />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilters({ agentId: value })}
            onSearch={setAgentSearch}
            value={filters.agentId ?? ""}
        >

        </CommandSelect>
    )
}
