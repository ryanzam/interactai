import { auth } from '@/lib/auth'
import { CallView } from '@/modules/call/ui/views/call-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface CallPageProps {
    params: Promise<{
        meetingId: string
    }>
}

const CallPage = async ({ params }: CallPageProps) => {
    const { meetingId } = await params

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/signin');
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CallView meetingId={meetingId} />
        </HydrationBoundary >
    )
}

export default CallPage