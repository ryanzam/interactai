import { AgentsView, AgentViewErrorComponent, AgentViewLoadingComponent } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import AgentListheader from '@/modules/agents/ui/components/agent-listheader'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const AgentsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/signin');
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    return (
        <>
            <AgentListheader />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentViewLoadingComponent />}>
                    <ErrorBoundary fallback={<AgentViewErrorComponent />}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default AgentsPage