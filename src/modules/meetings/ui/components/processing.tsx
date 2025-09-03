import EmptyComponent from '@/components/empty-component'
import React from 'react'

export const Processing = () => {
    return (
        <div className='bg-white rounded-lg flex flex-col px-4 py-5 items-center justify-center gap-y-5'>
            <EmptyComponent
                title='Meeting completed'
                description='The Meeting is completed, a summary will appear here soon'
            />
        </div>
    )
}
