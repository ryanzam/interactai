"use client"

import { DataTable } from '@/components/data-table'
import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { columns } from '../components/colums'
import EmptyComponent from '@/components/empty-component'
import { useRouter } from 'next/navigation'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { DataTablePagination } from '@/components/data-table-pagination'

export const MeetingsView = () => {

    const [filters, setFilters] = useMeetingsFilters()

    const trpc = useTRPC()
    const router = useRouter()

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }))



    return (
        <div className='flex-1 px-4'>
            <DataTable data={data.items} columns={columns} onClickRow={(row) => router.push(`/meetings/${row.id}`)} />
            <DataTablePagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />
            {data.items.length === 0 && (
                <EmptyComponent title='Create your first meeting' description='Interact with agent by scheduling a meetings.' />
            )}
        </div>
    )
}

export const MeetingsViewLoadingComponent = () => {
    return (
        <LoadingComponent title='Meetings loading...' description='Please wait...' />
    )
}

export const MeetingsViewErrorComponent = () => {
    return (
        <ErrorComponent title='Error loading Meetings...' description='Please try later...' />
    )
}