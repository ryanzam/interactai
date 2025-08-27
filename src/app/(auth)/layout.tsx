import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className='min-h-svh flex bg-muted flex-col items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm md:max-w-3xl'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout