import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'
import MeetingForm from './meeting-form'
import { id } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { MeetingGetOne } from '../../types'

interface UpdateMeetingDialogProps {
    open: boolean
    onOpenChange: (ope: boolean) => void
    initialValues: MeetingGetOne
}

const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingDialogProps) => {

    const router = useRouter()

    return (
        <ResponsiveDialog
            title='Edit Meeting'
            description='Edit meeting details'
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm onSuccess={() => {
                onOpenChange(false)
                router.push(`/meetings/${id}`)
            }}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues} />
        </ResponsiveDialog>
    )
}

export default UpdateMeetingDialog