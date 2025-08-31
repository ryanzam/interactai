"use client"

import { Button } from '@/components/ui/button'
import { Delete, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './new-agent-dialog'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import AgentsSearchFilters from './agents-search-filters'
import { DEFAULT_PAGE } from '@/constants'

const AgentListheader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filters, setFilters] = useAgentFilters()

    const isAnyFilterModified = !!filters.search

    const onClearFilters = () => {
        setFilters({
            search: "", page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className='flex flex-col gap-y-4 py-4 px-4'>
                <div className='flex items-center justify-between'>
                    <h5 className='font-medium'>My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <UserRoundPlus /> New Agent
                    </Button>
                </div>

                <div className='flex'>
                    <AgentsSearchFilters />
                    {isAnyFilterModified && (
                        <Button variant={"outline"} className='h-10' onClick={onClearFilters}>
                            <Delete />
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default AgentListheader