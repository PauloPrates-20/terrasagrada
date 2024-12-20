import { GiCauldron, GiGems, GiCrossedSwords, GiMightySpanner } from 'react-icons/gi';
import ListCard from './ListCard';

export default function Lists({ clickHandler }: { clickHandler: () => void }) {
	const iconSize = '2rem';

	const contents = [
		{ icon: <GiCauldron size={iconSize} />, text: 'Consumíveis', url: 'consumiveis' },
		{ icon: <GiGems size={iconSize} />, text: 'Itens Mágicos', url: 'itensmagicos' },
		{ icon: <GiCrossedSwords size={iconSize} />, text: 'Itens Mundanos', url: 'mundanos' },
		{ icon: <GiMightySpanner size={iconSize} />, text: 'Infusões de Artífice', url: 'artifice' },
	];

	return (
		<>
			{contents.map((content, index) => (
				<a className='select-none' key={index} href={`/listas/${content.url}`}>
					<ListCard icon={content.icon} text={content.text} clickHandler={clickHandler} />
				</a>
			))}
		</>
	);
}