import { signIn } from '@/auth';
import { FaDiscord } from 'react-icons/fa';


export default function SingIn() {
    return (
      <form
        action={async () => {
          'use server'
          await signIn('discord');
        }}
        className='absolute right-4'
      >
        <button type='submit' className='flex justify-center items-center gap-4 px-1 py-2 border border-titleColor rounded-md'>
          <p>Login</p> <FaDiscord size='2rem' />
        </button>
      </form>
    );
}