'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link'
import NavList, { Options } from './NavList';


export default function Dropdown() {
	const [display, setDisplay] = useState(false);

	const navLists: Options[] = [
		{ name: 'Consumíveis', url: '/listas/consumiveis' },
		{ name: 'Itens Mágicos', url: '/listas/itensmagicos'},
		{ name: 'Itens Mundanos', url: '/listas/mundanos'},
		{ name: 'Infusões de Artífice', url: '/listas/artifice'}
	];

	const navTools: Options[] = [
		{ name: 'Calculadora de HP', url: '/ferramentas/calculadorahp' },
		{ name: 'Nível de Conjurador', url: '/ferramentas/conjurador' },
		{ name: 'Calculadora do Artesão', url: '/ferramentas/crafting' },
		{ name: 'Grimório do Mago', url: '/ferramentas/grimorio' }
	];

	return (
		<>
			<nav
				className='absolute left-0 flex flex-row flex-wrap justify-start'
			>
				<FaBars 
					onClick={() => setDisplay(!display)}
					className='relative flex cursor-pointer mt-1 ml-3 mb-3 justify-start content-end'
				/>
				<div
					className={`flex flex-col absolute left-0 mt-10 pb-4 bg-barColor w-full sm:w-72 max-h-0 opacity-0 invisible rounded-[0_0_6px_0] transition-all ease-out duration-200 ${display ? 'isChecked' : 'notChecked'}`}
				>
					<Link 
						href='/'
						className='select-none relative no-underline text-xl text-textColor py-3 px-4 mx-0 w-full hover:shadow-[0_0_24px_8px_inset_#4406067f]'
					>
						Home
					</Link>
					<NavList label='Listas' options={navLists} />
					<NavList label='Ferramentas' options={navTools} />
				</div>
			</nav>
		</>
	);
}