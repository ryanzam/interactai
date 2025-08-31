"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { DataTable } from '../components/data-table'
import { columns } from '../components/colums'
import EmptyComponent from '@/components/empty-component'
import { useRouter } from 'next/navigation'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import { DataTablePagination } from '../components/data-table-pagination'

export const AgentsView = () => {

    const [filters, setFilters] = useAgentFilters()

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ ...filters }))

    const router = useRouter()

    return (
        <div className='flex-1 p-4'>
            <DataTable data={data.items} columns={columns} onClickRow={(row) => router.push(`/agents/${row.id}`)} />

            <DataTablePagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />

            {data.items.length === 0 && (
                <EmptyComponent title='Create your first agent' description='Interact with agent by creating your agent.' />
            )}
        </div>
    )
}

export const AgentsViewLoadingComponent = () => {
    return (
        <LoadingComponent title='Agents loading...' description='Please wait...' />
    )
}

export const AgentsViewErrorComponent = () => {
    return (
        <ErrorComponent title='Error loading agents...' description='Please try later...' />
    )
}
