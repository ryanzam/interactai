'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function Home() {

  const { data: session } = authClient.useSession()

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    return <div>
      <p>Signed in as {session.user?.name}</p>
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  }

  const onSubit = () => {
    authClient.signUp.email({
      name,
      email,
      password
    }, {
      onError: () => alert("Error signing up"),
      onSuccess: () => alert("Signed up successfully")
    })
  }

  return (
    <div>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={onSubit}>Sign up</Button>
    </div>
  );
}
