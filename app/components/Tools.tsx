import { GiHearts, GiSparkles, GiAnvilImpact, GiBookCover } from 'react-icons/gi';
import ListCard from './ListCard';

export default function Tools({ clickHandler }: { clickHandler: () => void }) {
	const iconSize = '2rem';

	const contents = [
		{ icon: <GiHearts size={iconSize} />, text: 'Calculadora de HP', url: 'calculadorahp' },
		{ icon: <GiSparkles size={iconSize} />, text: 'Nível de Conjurador', url: 'conjurador' },
		{ icon: <GiAnvilImpact size={iconSize} />, text: 'Calculadora do Artesão', url: 'crafting' },
		{ icon: <GiBookCover size={iconSize} />, text: 'Grimório do Mago', url: 'grimorio' },
	];

	return (
		<>
			{contents.map((content, index) => (
				<a className='select-none' key={index} href={`/ferramentas/${content.url}`}>
					<ListCard icon={content.icon} text={content.text} clickHandler={clickHandler} />
				</a>
			))}
		</>
	);
}