"use client"

import { Button } from '@/components/ui/button'
import { Delete, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import NewMeetingDialog from './new-meeting-dialog'
import MeetingsSearchFilters from './meetings-search-filters'
import MeetingsStatusFilters from './meetings-status-filters'
import { AgentIdFilter } from './agent-id-filter'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const MeetingListheader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filters, setFilters] = useMeetingsFilters()

    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId

    const onClearFilters = () => {
        setFilters({
            search: "", status: null, agentId: "", page: 1
        })
    }

    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className='flex flex-col gap-y-4 py-4 px-4'>
                <div className='flex items-center justify-between'>
                    <h5 className='font-medium'>My Meetings</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <UserRoundPlus /> New Meeting
                    </Button>
                </div>

                <ScrollArea>
                    <div className='flex items-center'>
                        <MeetingsSearchFilters />
                        <MeetingsStatusFilters />
                        <AgentIdFilter />
                        <div className='flex'>
                            {isAnyFilterModified && (
                                <Button variant={"outline"} className='h-10' onClick={onClearFilters}>
                                    <Delete />
                                </Button>
                            )}
                        </div>
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>

            </div>
        </>
    )
}

export default MeetingListheader