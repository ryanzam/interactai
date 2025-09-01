import ResponsiveDialog from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import React, { JSX, useState } from 'react'

export const useConfirmation = (
    title: string,
    description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void
    } | null>(null)

    const confirmation = () => {
        return new Promise((resolve) => {
            setPromise({ resolve })
        })
    }

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirmation = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const ConfirmationDiaglog = () => {
        return <ResponsiveDialog open={promise !== null}
            onOpenChange={handleClose}
            title={title}
            description={description}
        >
            <div className="w-full pt-4 flex gap-x-2 items-center justify-end">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleConfirmation}>
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    }

    return [ConfirmationDiaglog, confirmation]
}
