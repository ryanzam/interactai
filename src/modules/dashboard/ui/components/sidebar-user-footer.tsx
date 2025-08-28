"use client"

import AvatarGenerate from '@/components/avatar-generate'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, CreditCard, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SidebarUserFooter = () => {

    const router = useRouter()

    const { data, isPending } = authClient.useSession()

    if (isPending || !data?.user) return null;

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/signin')
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='p-3 border rounded-lg flex items-center bg-black/20 hover:bg-black/10'>
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image as string} />
                    </Avatar>
                ) : <AvatarGenerate seed={data.user.name} variant='initials' className='size-8 mr-3' />}

                <div className='text-left'>
                    <p className='text-sm font-bold truncate'>{data.user.name}</p>
                    <p className='text-xs truncate'>{data.user.email}</p>
                </div>
                <ChevronDown className='size-4 shrink-0 ml-auto' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='right' className='w-48 space-y-2'>
                <DropdownMenuItem className='p-3 cursor-pointer flex items-center justify-between hover:bg-black/10'>
                    Billing
                    <CreditCard className='size-4 ml-auto' />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className='p-3 cursor-pointer flex items-center justify-between hover:bg-black/10'>
                    Logout
                    <LogOutIcon className='size-4 ml-auto' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SidebarUserFooter