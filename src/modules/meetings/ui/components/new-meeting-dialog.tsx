import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'
import MeetingForm from './meeting-form'
import { id } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface NewMeetingDialogProps {
    open: boolean
    onOpenChange: (ope: boolean) => void
}

const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingDialogProps) => {

    const router = useRouter()

    return (
        <ResponsiveDialog
            title='New Meeting'
            description='Create a new Meeting'
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm onSuccess={() => {
                onOpenChange(false)
                router.push(`/meetings/${id}`)
            }} onCancel={() => onOpenChange(false)} />
        </ResponsiveDialog>
    )
}

export default NewMeetingDialog