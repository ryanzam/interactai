import { AgentView, AgentViewErrorComponent, AgentViewLoadingComponent } from '@/modules/agents/ui/views/agent-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface AgentPageProps {
    params: Promise<{ agentId: string }>
}

const AgentPage = async ({ params }: AgentPageProps) => {

    const { agentId } = await params

    const querClient = getQueryClient()
    void querClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    )

    return (
        <HydrationBoundary state={dehydrate(querClient)}>
            <Suspense fallback={<AgentViewLoadingComponent />}>
                <ErrorBoundary fallback={<AgentViewErrorComponent />}>
                    <AgentView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default AgentPage