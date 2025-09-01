"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

export const MeetingsView = () => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div>{JSON.stringify(data, null, 2)}</div>
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