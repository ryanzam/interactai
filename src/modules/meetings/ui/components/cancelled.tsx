import EmptyComponent from '@/components/empty-component'
import React from 'react'

export const Cancelled = () => {
    return (
        <div className='bg-white rounded-lg flex flex-col px-4 py-5 items-center justify-center gap-y-5'>
            <EmptyComponent
                title='Meeting is cancelled'
                description='The Meeting has cancelled'
            />
        </div>
    )
}
