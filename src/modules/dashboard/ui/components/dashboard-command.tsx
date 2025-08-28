import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React from 'react'

interface DashboardCommandProps {
    open?: boolean
    setOpen?: (open: boolean) => void
}

const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder='Find a agent...' />
            {/* Future command list can be added here */}
            <CommandList>
                <CommandItem>
                    Some Commands
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}

export default DashboardCommand