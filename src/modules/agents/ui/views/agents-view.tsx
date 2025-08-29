"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { DataTable } from '../components/data-table'
import { columns } from '../components/colums'
import EmptyComponent from '@/components/empty-component'

export const AgentsView = () => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <div className='flex-1 pb-4 px-4'>
            <DataTable data={data} columns={columns} />

            {data.length === 0 && (
                <EmptyComponent title='Create your first agent' description='Interact with agent by creating your agent.' />
            )}
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
