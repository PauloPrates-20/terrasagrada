import Image from 'next/image';
import Dropdown from './Dropdown';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();
  
  return (
    <header
      className='relative top-0 bg-barColor w-full h-16 text-2xl py-2 px-3 flex justify-between items-center'
    >
      <Dropdown />
      <div
        className='absolute right-1/2 translate-x-1/2'
      >
        <a
          href='/'
          className='flex justify-center items-center py-0 px-3 no-underline text-textColor select-none'
        >
          <p className='mr-2'>Terra Sagrada</p>
          <Image
            src={'/images/d20.png'}
            alt=''
            width={30}
            height={30}
          />
        </a>
      </div>
      {session?.user ? <SignOut /> : <SignIn />}
    </header>
  );
}