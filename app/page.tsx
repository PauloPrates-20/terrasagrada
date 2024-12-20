'use client';

import { useState } from 'react';
import { GiHamburgerMenu, GiGearHammer } from 'react-icons/gi';
import ListCard from './components/ListCard';
import Lists from './components/Lists';
import Tools from './components/Tools';

export default function Home() {
	const [content, setContent] = useState('none');
	const [oldContent, setOldContent] = useState(content);

	function toggleContents(text: string) {
		setOldContent(content);

		if (content === text) setContent('none');
		else {
			if (content === 'none') setContent(text);
			else {
				setContent('none');
				setTimeout(() => {
					setContent(text);
				}, 700);
			}
		}
	}

  return (
		<>
			<div>
				<h1 className='font-bold text-3xl mb-16'>
					Bem vindo(a) à <span className='font-bold text-titleColor'>Terra Sagrada!</span>
				</h1>
				<p className='mb-16'>
					Aqui você encontra o material de referência, assim como ferramentas úteis, para a sua jogatina nas mesas da Terra Sagrada!
				</p>
			</div>
			<div
				className='h-52 flex justify-center items-center gap-8 relative'
			>
				<ListCard 
					icon={<GiHamburgerMenu size={'2rem'} />} 
					text='Listas' 
					clickHandler={toggleContents}
				/>
				<ListCard 
					icon={<GiGearHammer size={'2rem'} />}
					text='Ferramentas'
					clickHandler={toggleContents}
				/>
			</div>
			<div
				className={`flex justify-center items-center transition-all ease-in-out duration-700 ${content === 'none' ? 'h-40 sm:h-24 opacity-0 invisible' : 'h-52 visible'}`}
			>
				<div
					className='flex flex-wrap justify-center items-center gap-4'
				>
					{content === 'none' ? oldContent === 'Listas' ? (
						<Lists clickHandler={() => {}} />
					) : oldContent === 'Ferramentas' ? (
						<Tools clickHandler={() => {}} />
					) : (
						<></>
					) : content === 'Listas' ? (
						<Lists clickHandler={() => {}} />
					) : (
						<Tools clickHandler={() => {}} />
					)}
				</div>
			</div>
		</>
  );
}
