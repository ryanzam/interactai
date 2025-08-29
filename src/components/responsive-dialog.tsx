import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface ResponsiveDialogProps {
    title: string
    description: string
    children: React.ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
}

const ResponsiveDialog = ({
    title, description, children, open, onOpenChange
}: ResponsiveDialogProps) => {

    const isMobile = useIsMobile()

    if (isMobile) {
        return <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className='p-4'>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-medium'>{title}</DialogTitle>
                    <DialogDescription className='text-sm'>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ResponsiveDialog