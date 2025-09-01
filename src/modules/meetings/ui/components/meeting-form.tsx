import React, { useState } from 'react'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MeetingGetOne } from '../../types'
import { meetingsInsertSchema } from "../../schema"
import CommandSelect from '@/components/command-select'
import AvatarGenerate from '@/components/avatar-generate'
import NewAgentDialog from '@/modules/agents/ui/components/new-agent-dialog'

interface MeetingFormProps {
    initialValues?: MeetingGetOne
    onSuccess?: (id?: string) => void
    onCancel?: () => void
}

const MeetingForm = ({ initialValues, onSuccess, onCancel }: MeetingFormProps) => {

    const [agentSearch, setAgentSearch] = useState("")
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)

    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch })
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )
                onSuccess?.(data.id)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValues.id })
                    )
                }
                onSuccess?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? ""
        }
    })

    const isEdit = !!initialValues?.id
    const isPending = createMeeting.isPending || updateMeeting.isPending

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues.id })
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <>
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
            <Form {...form}>
                <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Name your Meeting e.g. My Meeting 1' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='agentId'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        options={(agents.data?.items ?? []).map((agent) => ({
                                            id: agent.id,
                                            value: agent.id,
                                            children: (
                                                <div className='flex items-center gap-x-2'>
                                                    <AvatarGenerate seed={agent.name} variant={"botttsNeutral"} className='border' />
                                                    <span className='font-medium'>{agent.name}</span>
                                                </div>
                                            )
                                        }))}
                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                    ></CommandSelect>
                                </FormControl>
                                <FormDescription>
                                    Not found any agents?
                                    <button type='button'
                                        className='text-primary hover:underline'
                                        onClick={() => setOpenNewAgentDialog(true)}>
                                        Create new agent
                                    </button>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className='flex justify-between'>
                        <Button disabled={isPending} type='submit'>
                            {isEdit ? "Update" : "Create"}
                        </Button>
                        {onCancel && (
                            <Button variant="ghost" disabled={isPending} type='button' onClick={() => onCancel()}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </>
    )
}

export default MeetingForm