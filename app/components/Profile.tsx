import { auth } from '@/auth';
import { redirect } from 'next/navigation'
import Image from 'next/image';
import { FaRegUserCircle } from 'react-icons/fa';

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  if(!user) return <></>

  return (
    <div className='flex justify-center items-center gap-2'>
      <div>
        {user.image ? 
          <Image src={user.image} width={32} height={32} alt='' className='rounded-full' /> : 
          <FaRegUserCircle size='2rem' />}
      </div> 
      <p>{user.name}</p>
    </div>
  );
}