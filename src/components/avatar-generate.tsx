import { createAvatar } from "@dicebear/core"
import { initials, botttsNeutral } from "@dicebear/collection"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

interface AvatarGenerateProps {
    seed: string
    variant: "initials" | "botttsNeutral"
    className?: string
}

const AvatarGenerate = ({ seed, variant, className }: AvatarGenerateProps) => {

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

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="avatar" />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default AvatarGenerate