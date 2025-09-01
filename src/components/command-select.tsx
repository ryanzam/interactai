import React, { ReactNode, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from './ui/command'
import { ChevronsUpDownIcon } from 'lucide-react'

interface CommandSelectProps {
    options: Array<{
        id: string
        value: string
        children: ReactNode
    }>
    onSelect: (value: string) => void
    onSearch: (values: string) => void
    value: string
    placeholder?: string
    isSearchable?: boolean
    className?: string
}

const CommandSelect = ({
    options, onSearch, onSelect, value, placeholder = "Select an option", isSearchable, className
}: CommandSelectProps) => {

    const [open, setOpen] = useState(false)
    const selectedOption = options.find(opt => opt.value === value)

    return (
        <>
            <Button onClick={() => setOpen(true)} type='button' variant={"outline"}
                className={cn(
                    "h-9 font-normal justify-between",
                    !selectedOption && "text-muted-foreground", className
                )}>
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>

            <CommandResponsiveDialog
                shouldFilter={!onSearch} open={open} onOpenChange={setOpen}
            >
                <CommandInput placeholder='Search...' onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className='text-muted-foreground text-sm'>
                            No options found
                        </span>
                    </CommandEmpty>
                    {options.map((opt) => (
                        <CommandItem key={opt.id} onSelect={() => {
                            onSelect(opt.value)
                            setOpen(false)
                        }} >
                            {opt.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}

export default CommandSelect