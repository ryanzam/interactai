import Image from "next/image"
import { ReactNode } from "react"

interface EmptyProps {
    title: string
    description: string
}

const EmptyComponent = ({ title, description }: EmptyProps) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Image src="/empty.svg" alt="empty" width={200} height={200} />
            <div className='flex flex-col items-center justify-center gap-y-2'>
                <h6 className='text-lg font-medium'>{title}</h6>
                <p className='text-sm text-muted-foreground'>{description}</p>
            </div>
        </div>
    )
}

export default EmptyComponent