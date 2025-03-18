import { signOut } from '@/auth';
import { FaPowerOff } from 'react-icons/fa'
import Profile from './Profile';

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut();
      }}
      className='absolute right-4'
    >
      <button type='submit' className='flex justify-center items-center gap-4 px-1 py-2 border border-titleColor rounded-md'>
        <Profile />
        <FaPowerOff />
      </button>
    </form>
  );
}