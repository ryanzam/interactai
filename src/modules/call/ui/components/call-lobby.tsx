import React from 'react'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { DefaultVideoPlaceholder, name, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk'
import { authClient } from '@/lib/auth-client'
import { generateAvatarUri } from '@/lib/avatar'
import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

interface CallLobbyProps {
    onJoin: () => void
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession()

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user.name ?? "",
                    image: data?.user.image ??
                        generateAvatarUri({
                            seed: data?.user.name ?? "",
                            variant: "initials"
                        })
                } as StreamVideoParticipant
            }
        />
    )
}

const AllowBrowserPermissions = () => {
    return <p className='text-sm'>
        Please grant your browser permission to access your camer and microphone.
    </p>
}

export const CallLobby = ({ onJoin }: CallLobbyProps) => {

    const { useCameraState, useMicrophoneState } = useCallStateHooks()

    const { hasBrowserPermission: hasMicPermission } = useMicrophoneState()
    const { hasBrowserPermission: hasCamPermission } = useCameraState()

    const hasBrowserMediaPermission = hasCamPermission && hasCamPermission

    return (
        <div className='h-screen flex items-center justify-center bg-radial'>
            <div className="flex items-center flex-col justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <div className='flex flex-col gap-y-2 text-center'>
                    <h6 className='text-lg font-medium'>Ready to join?</h6>
                    <p className='text-sm'>Set up your call before joing</p>
                </div>
                <VideoPreview
                    DisabledVideoPreview={
                        hasBrowserMediaPermission ? DisabledVideoPreview : AllowBrowserPermissions
                    }
                />

                <div className='flex gap-x-2'>
                    <ToggleVideoPreviewButton />
                    <ToggleAudioPreviewButton />
                </div>

                <div className='flex gap-x-2 justify-between w-full'>
                    <Button variant={"outline"}>
                        <Link href={"/meetings"}>
                            Cancel
                        </Link>
                    </Button>
                    <Button onClick={onJoin}>
                        <LogInIcon />
                        Join Call
                    </Button>
                </div>
            </div>
        </div>
    )
}
