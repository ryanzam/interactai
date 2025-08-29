"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

export const AgentsView = () => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

export const AgentViewLoadingComponent = () => {
    return (
        <LoadingComponent title='Agents loading...' description='Please wait...' />
    )
}

export const AgentViewErrorComponent = () => {
    return (
        <ErrorComponent title='Error loading agents...' description='Please try later...' />
    )
}
