import { SetStateAction } from "react";

export default function ListCard({ 
	icon,
	text,
	clickHandler
}: {
	icon: React.ReactNode,
	text: string,
	clickHandler: ((text: string) => void) | (() => void)
}) {
	return (
		<div 
			onClick={() => clickHandler(text)}
			className='flex justify-center items-center flex-col gap-2 border border-titleColor w-24 h-24 text-base transition-all ease-in-out duration-300 hover:text-xl hover:w-32 hover:h-32 hover:cursor-pointer sm:w-40 sm:h-40 sm:text-xl sm:hover:text-2xl sm:hover:w-44 sm:hover:h-44 select-none'
		>
			{icon}
			<p>{text}</p>
		</div>
	);
}