"use client"

import ErrorComponent from '@/components/error-component'
import LoadingComponent from '@/components/loading-component'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { MeetingHeader } from '../components/meeting-header'
import { useRouter } from 'next/navigation'
import { useConfirmation } from '@/hooks/use-confirmation'
import UpdateMeetingDialog from '../components/update-meeting-dialog'
import { Upcoming } from '../components/upcoming'
import { Active } from '../components/active'
import { Cancelled } from '../components/cancelled'
import { Processing } from '../components/processing'

interface MeetingViewProps {
    meetingId: string
}

export const MeetingView = ({ meetingId }: MeetingViewProps) => {

    const trpc = useTRPC()
    const router = useRouter()

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    const queryClient = useQueryClient()

    const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false)

    const [RemoveConfirmation, confirmRemove] = useConfirmation(
        "Cofirmation!",
        `This action will remove "${data.name}" associated meetings`
    )

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                router.push("/meetings")
            },
        })
    )

    const handleRemoveMeeting = async () => {
        const sure = await confirmRemove()

        if (!sure) return

        await removeMeeting.mutateAsync({ id: meetingId })
    }

    const isActive = data.status === "active"
    const isUpcoming = data.status === "upcoming"
    const isCompleted = data.status === "completed"
    const isProcessinng = data.status === "processing"
    const isCancelled = data.status === "cancelled"

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog open={updateMeetingDialog} onOpenChange={setUpdateMeetingDialog} initialValues={data} />
            <div className='flex-1 p-4'>
                <MeetingHeader meetingId={data.id} meetingName={data.name} onEdit={() => setUpdateMeetingDialog(true)} onRemove={handleRemoveMeeting} />

                {isUpcoming && <Upcoming meetingId={meetingId} onCancelMeeting={() => { }} isCancelling={false} />}
                {isActive && <Active meetingId={meetingId} />}
                {isCancelled && <Cancelled />}
                {isProcessinng && <Processing />}

            </div>
        </>
    )
}

export const MeetingViewLoadingComponent = () => {
    return (
        <LoadingComponent title='Meeting loading...' description='Please wait...' />
    )
}

export const MeetingViewErrorComponent = () => {
    return (
        <ErrorComponent title='Error loading Meeting...' description='Please try later...' />
    )
}
