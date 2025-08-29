import { AlertCircleIcon } from 'lucide-react'
import React from 'react'

interface ErrorProps {
    title: string
    description: string
}

const ErrorComponent = ({ title, description }: ErrorProps) => {
    return (
        <div className='flex flex-1 items-center justify-center'>
            <div className='flex flex-col items-center bg-background p-10 rounded-lg gap-y-5'>
                <AlertCircleIcon size={40} className='text-red-500'/>
                <div className='flex flex-col items-center justify-center'>
                    <h6 className='text-lg font-medium text-red-500'>{title}</h6>
                    <p className='text-sm text-red-500/95'>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorComponent