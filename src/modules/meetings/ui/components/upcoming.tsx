import EmptyComponent from '@/components/empty-component'
import { Button } from '@/components/ui/button'
import { BanIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface UpcomingProps {
    meetingId: string
    onCancelMeeting: () => void
    isCancelling: boolean
}

export const Upcoming = ({ meetingId, onCancelMeeting, isCancelling }: UpcomingProps) => {
    return (
        <div className='bg-white rounded-lg flex flex-col px-4 py-5 items-center justify-center gap-y-5'>
            <EmptyComponent
                title='Not yet started'
                description='Once meeting is started, a summary will show up here.'
            />

            <div className='flex w-full flex-col-reverse lg:flex-row items-center justify-center gap-2'>
                <Button variant={"secondary"}
                    className='w-full lg:w-auto'
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon />
                    Cancel meeting
                </Button>
                <Button disabled={isCancelling} asChild className='w-full lg:w-auto'>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}
