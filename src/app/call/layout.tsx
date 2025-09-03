import React, { ReactNode } from 'react'

interface CallLayoutProps {
    children: ReactNode
}

const CallLayout = ({ children }: CallLayoutProps) => {

    return (
        <div className='h-screen bg-black'>
            {children}
        </div>
    )
}

export default CallLayout