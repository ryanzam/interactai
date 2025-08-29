"use client"

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import DashboardCommand from './dashboard-command'

const DashboardNav = () => {

    const { state, isMobile, toggleSidebar } = useSidebar()
    const [commandOpen, setCommandOpen] = useState(false)

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

            <nav className='flex items-center px-4 py-2 gap-x-2 bg-background'>
                <Button variant="outline" size="icon" onClick={toggleSidebar}>
                    {(isMobile || state === "collapsed") ? <PanelLeftIcon /> : <PanelLeftCloseIcon />}
                </Button>

                <Button className='h-8 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground'
                    variant={'outline'}
                    size='sm'
                    onClick={() => { setCommandOpen(!commandOpen) }}
                >
                    <SearchIcon />
                    Search
                    <kbd className='ml-auto text-xs font-normal opacity-60 pointer-events-none rounded border bg-muted text-[10px]'>
                        <span className='text-sm px-2'>&crarr;</span>
                    </kbd>
                </Button>
            </nav>
        </>
    )
}

export default DashboardNav