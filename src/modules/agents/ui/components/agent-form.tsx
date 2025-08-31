import React from 'react'
import { AgentGetOne } from '../../types'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { agentsInsertSchema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import AvatarGenerate from '@/components/avatar-generate'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface AgentFormProps {
    initialValues?: AgentGetOne
    onSuccess?: () => void
    onCancel?: () => void
}

const AgentForm = ({ initialValues, onSuccess, onCancel }: AgentFormProps) => {

    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                )
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    )
                }
                onSuccess?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? ""
        }
    })

    const isEdit = !!initialValues?.id
    const isPending = createAgent.isPending

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("update")
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <AvatarGenerate seed={form.watch("name")} variant='botttsNeutral' className='border size-10' />
                <FormField
                    name='name'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Name your agent e.g. My Guide' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name='instructions'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Give some instruction to the agent' />
                            </FormControl>
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
    )
}

export default AgentForm