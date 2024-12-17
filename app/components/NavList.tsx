'use client';

import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

export interface Options {
	name: string;
	url: string;
};

type ListProps = {
	label: string;
	options: Options[];
};

export default function NavList({ label, options }: ListProps) {
	const [display, setDisplay] = useState(false);

	return (
		<>
			<div 
				onClick={() => setDisplay(!display)}
				className='relative flex cursor-pointer justify-start content-center hover:shadow-[0_0_24px_8px_inset_#4406067f] px-3'
			>
				<span className='mt-2'>{display ? <FaMinusSquare /> : <FaPlusSquare />}</span>
				<span className='relative no-underline py-3 px-2 text-xl select-none'>{label}</span>
			</div>
			<div
				className={`flex flex-col w-full max-h-0 opacity-0 invisible transition-all ease-out duration-200 z-10 ${display ? 'isChecked' : 'notChecked'}`}
			>
				{options.map((option, index) => (
					<Link 
						href={option.url} 
						key={index}
						className='select-none relative no-underline text-base text-textColor py-3 px-5 mx-0 w-full hover:shadow-[0_0_24px_8px_inset_#4406067f]'
					>
						{option.name}
					</Link>
				))}
			</div>
		</>
	);
}