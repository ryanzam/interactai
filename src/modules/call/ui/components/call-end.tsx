import React from 'react'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const CallEnded = () => {

    return (
        <div className='h-screen flex items-center justify-center bg-radial'>
            <div className="flex items-center flex-col justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <div className='flex flex-col gap-y-2 text-center'>
                    <h6 className='text-lg font-medium'>You call is ended</h6>
                    <p className='text-sm'>Summary will appear soon</p>
                </div>

                <Button asChild>
                    <Link href="/meetings">
                        Back to meetings
                    </Link>
                </Button>
            </div>
        </div>
    )
}
