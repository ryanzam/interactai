import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface AgentHeaderProps {
    agentId: string
    agentName: string
    onEdit: () => void
    onRemove: () => void
}

const AgentHeader = ({ agentId, agentName, onEdit, onRemove }: AgentHeaderProps) => {
    return (
        <div className='flex items-center justify-between'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='text-xl font-medium'>
                            <Link href={"/agents"}>My Agents</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='text-xl font-medium text-foreground'>
                            <Link href={`/agents/${agentId}`}>{agentName}</Link>
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

export default AgentHeader