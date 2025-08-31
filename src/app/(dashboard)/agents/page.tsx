import { AgentsView, AgentsViewErrorComponent, AgentsViewLoadingComponent } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import AgentListheader from '@/modules/agents/ui/components/agent-listheader'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SearchParams } from 'nuqs'
import { loadSearchParams } from '@/modules/agents/params'

interface AgentsPageProps {
    searchParams: Promise<SearchParams>
}

export const AgentsPage = async ({ searchParams }: AgentsPageProps) => {

    const filterParams = await loadSearchParams(searchParams)

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/signin');
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({ ...filterParams }))

    return (
        <>
            <AgentListheader />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoadingComponent />}>
                    <ErrorBoundary fallback={<AgentsViewErrorComponent />}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default AgentsPage