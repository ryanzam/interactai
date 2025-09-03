import EmptyComponent from '@/components/empty-component'
import { Button } from '@/components/ui/button'
import { BanIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ActiveProps {
    meetingId: string
}

export const Active = ({ meetingId }: ActiveProps) => {
    return (
        <div className='bg-white rounded-lg flex flex-col px-4 py-5 items-center justify-center gap-y-5'>
            <EmptyComponent
                title='Meeting is active'
                description='Meeting will end once all participants have left.'
            />

            <div className='flex w-full flex-col-reverse lg:flex-row items-center justify-center gap-2'>
                <Button asChild className='w-full lg:w-auto'>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Join meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}
