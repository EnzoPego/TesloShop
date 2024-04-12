
'use server'

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    return 'Success'

  } catch (error) {

    if ((error as any).type === 'CredentialsSignin'){
      return 'CredentialsSignin'
    }

    return 'UnknownError'

  }
}