import { Loader2Icon } from 'lucide-react'
import React from 'react'

interface LoadingProps {
    title: string
    description: string
}

const LoadingComponent = ({ title, description }: LoadingProps) => {
    return (
        <div className='flex flex-1 items-center justify-center'>
            <div className='flex flex-col items-center bg-background p-10 rounded-lg gap-y-5'>
                <Loader2Icon size={40} className='animate-spin'/>
                <div className='flex flex-col items-center justify-center'>
                    <h6 className='text-lg font-medium'>{title}</h6>
                    <p className='text-sm'>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent