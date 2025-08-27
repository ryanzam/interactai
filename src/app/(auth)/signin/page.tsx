import { auth } from '@/lib/auth';
import { SigninView } from '@/modules/auth/ui/views/signin-view'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const SigninPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session) {
    redirect('/');
  }

  return (
    <SigninView />
  )
}

export default SigninPage