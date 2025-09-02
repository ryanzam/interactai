"use client"

import { DataTable } from '@/components/data-table'
import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { columns } from '../components/colums'

export const MeetingsView = () => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div className='flex-1 px-4'>
            <DataTable data={data.items} columns={columns}/>
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