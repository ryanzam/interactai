"use client"

import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './new-agent-dialog'

const AgentListheader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

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
            </div>
        </>
    )
}

export default AgentListheader