"use client"

import { authClient } from '@/lib/auth-client'
import { Loader2Icon } from 'lucide-react'
import React from 'react'
import { CallConnect } from './call-connect'
import { generateAvatarUri } from '@/lib/avatar'

interface CallProviderProps {
    meetingId: string
    meetingName: string
}

export const CallProvider = ({ meetingId, meetingName }: CallProviderProps) => {

    const { data, isPending } = authClient.useSession()

    if (!data || isPending) {
        return (
            <div className='h-screen flex items-center justify-center bg-radial from-sidebar-accent'>
                <Loader2Icon className='size-6 animate-spin text-white' />
            </div>
        )
    }

    return (
        <CallConnect meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={
                data.user.image ?? generateAvatarUri({ seed: data.user.name, variant: "initials" })
            }
        />
    )
}
