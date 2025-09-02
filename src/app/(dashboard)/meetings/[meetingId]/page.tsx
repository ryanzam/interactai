import { auth } from '@/lib/auth'
import { MeetingView, MeetingViewErrorComponent, MeetingViewLoadingComponent } from '@/modules/meetings/ui/views/meeting-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface MeetingPageProps {
    params: Promise<{
        meetingId: string
    }>
}

const MeetingPage = async ({ params }: MeetingPageProps) => {

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
            <Suspense fallback={<MeetingViewLoadingComponent />}>
                <ErrorBoundary fallback={<MeetingViewErrorComponent />}>
                    <MeetingView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingPage