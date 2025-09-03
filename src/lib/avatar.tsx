import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import React from 'react'

interface AvatarProps {
    seed: string
    variant: "initials" | "botttsNeutral"
}

export const generateAvatarUri = ({ seed, variant }: AvatarProps) => {
    let avatar

    if (variant === "initials") {
        avatar = createAvatar(initials, {
            seed: seed
        })
    } else {
        avatar = createAvatar(botttsNeutral, {
            seed: seed,
        })
    }

    return avatar.toDataUri()
}
