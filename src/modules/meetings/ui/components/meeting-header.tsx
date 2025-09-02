import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface MeetingHeaderProps {
    meetingId: string
    meetingName: string
    onEdit: () => void
    onRemove: () => void
}

export const MeetingHeader = ({ meetingId, meetingName, onEdit, onRemove }: MeetingHeaderProps) => {
    return (
        <div className='flex items-center justify-between'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='text-xl font-medium'>
                            <Link href={"/meetings"}>My Meetings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='text-xl font-medium text-foreground'>
                            <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={onEdit} >
                        <PencilIcon className='size-4 text-black' />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove} >
                        <TrashIcon className='size-4 text-black' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

