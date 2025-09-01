"use client"

import { Button } from '@/components/ui/button'
import { Delete, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import NewMeetingDialog from './new-meeting-dialog'

const MeetingListheader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

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

                {/*  <div className='flex'>
                    {isAnyFilterModified && (
                        <Button variant={"outline"} className='h-10' onClick={onClearFilters}>
                            <Delete />
                        </Button>
                    )}
                </div> */}
            </div>
        </>
    )
}

export default MeetingListheader