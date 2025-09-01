import { auth } from '@/lib/auth'
import MeetingListheader from '@/modules/meetings/ui/components/meeting-listheader'
import { MeetingsView, MeetingsViewErrorComponent, MeetingsViewLoadingComponent } from '@/modules/meetings/ui/views/meetings-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const MeetingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/signin');
    }


    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )

    return (
        <>
            <MeetingListheader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingsViewLoadingComponent />}>
                    <ErrorBoundary fallback={<MeetingsViewErrorComponent />}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default MeetingsPage



