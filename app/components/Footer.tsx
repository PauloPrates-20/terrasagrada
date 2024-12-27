import { FaDiscord } from 'react-icons/fa'
import credits from '@/public/credits.json';

export default function Footer() {
	return (
		<footer
			className='bg-barColor text-center min-h-fit p-4 flex flex-col'
		>
			<h3>
				O site oficial do sevidor <span className='text-titleColor font-bold'>Terra Sagrada</span> no
				<span className='text-titleColor font-bold'> Discord </span>
				<span className='text-titleColor font-bold align-baseline text-3xl/6'>
					<FaDiscord />
				</span>
			</h3>
			<div className='pt-2 text-sm'>
				<p>
					V4.1 2024
				</p>
				<p>
					Background image <a target='_blank' href={credits.img.bg.url}>{credits.img.bg.author}</a> {credits.img.bg.site}
				</p>
			</div>
		</footer>
	);
}