import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'
import AgentForm from './agent-form'

interface NewAgentDialogProps {
    open: boolean
    onOpenChange: (ope: boolean) => void
}

const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title='New Agent'
            description='Create a new agent'
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
        </ResponsiveDialog>
    )
}

export default NewAgentDialog