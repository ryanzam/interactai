'use client'

import { Button } from '@/components/ui/button';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const HomeView = () => {

    const { data: session } = authClient.useSession()

    const router = useRouter();

    if (!session) {
        return <div>
            Loading...
        </div>
    }

    return <div>
        <p>Signed in as {session.user?.name}</p>
        <Button onClick={() =>
            authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push('/signin'),
                }
            })}
        >Sign out</Button>
    </div>
}
