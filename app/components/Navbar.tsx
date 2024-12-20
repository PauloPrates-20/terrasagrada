import Image from 'next/image';
import Dropdown from './Dropdown';

export default function Navbar() {
	return (
		<header
			className='relative top-0 bg-barColor w-full h-12 text-2xl py-2 px-3 flex'
		>
			<Dropdown />
			<div
				className='absolute right-0'
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
		</header>
	);
}