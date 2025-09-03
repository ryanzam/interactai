"use client"

import ErrorComponent from '@/components/error-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { CallProvider } from '../components/call-provider'

interface CallViewProps {
    meetingId: string
}

export const CallView = ({ meetingId }: CallViewProps) => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))

    if (data.status === "completed") {
        return (<div className='h-screen flex items-center justify-center'>
            <ErrorComponent title='The meeting has ended' description='You cannot join the meeting' />
        </div>)
    }

    return (
        <CallProvider meetingId={meetingId} meetingName={data.name} />
    )
}
