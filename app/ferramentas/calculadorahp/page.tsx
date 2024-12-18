'use client'

import { useState } from 'react';
import FormSelect from '@/app/components/FormSelect';

export default function CalculadoraHP() {
	const playerClasses = [
		{ value: 'artifice', name: 'Artífice' },
		{ value: 'barbaro', name: 'Bárbaro' },
		{ value: 'bardo', name: 'Bardo' },
		{ value: 'bruxo', name: 'Bruxo' },
		{ value: 'clerigo', name: 'Clérigo' },
		{ value: 'druida', name: 'Druida' },
		{ value: 'feiticeiro', name: 'Feiticeiro' },
		{ value: 'guerreiro', name: 'Guerreiro' },
		{ value: 'ladino', name: 'Ladino' },
		{ value: 'mago', name: 'Mago' },
		{ value: 'monge', name: 'Monge' },
		{ value: 'paladino', name: 'Paladino' },
		{ value: 'patrulheiro', name: 'Patrulheiro' },
	];
	
	const hitDices = {
		artifice: 8,
		barbaro: 12,
		bardo: 8,
		bruxo: 8,
		clerigo: 8,
		druida: 8,
		feiticeiro: 6,
		guerreiro: 10,
		ladino: 8,
		mago: 6,
		monge: 8,
		paladino: 10,
		patrulheiro: 10,
	};

	const [playerClass, setPlayerClass] = useState('artifice');
	const [multClass, setMultClass] = useState({ one: 'none', two: 'none', three: 'none' });
	const [multLvl, setMultLvl] = useState({ one: 1, two: 1, three: 1 });
	const [multHitDice, setMultHitDice] = useState({ one: 0, two: 0, three: 0 });
	const [hitDice, setHitDice] = useState(8);
	const [lvl, setLvl] = useState(1);
	const [con, setCon] = useState(10);
	const [conMod, setConMod] = useState(Math.floor((con - 10) / 2));
	const [dragon, setDragon] = useState(0);
	const [dwarf, setDwarf] = useState(0);
	const [feat, setFeat] = useState(0);
	const [out, setOut] = useState(0);
	const [first, setFirst] = useState(0);
	const [next, setNext] = useState(0);
	const [sorcerer, setSorcerer] = useState(false);

	let results = [];

	function changeClass(value: string) {
		if (value in hitDices) {
			setPlayerClass(value);
			setHitDice(hitDices[value as keyof typeof hitDices]);
		} else {
			console.warn(`Invalid class string: ${value}. Setting default class.`);
			setPlayerClass('artifice');
			setHitDice(hitDices['artifice']);
		}
	}
	
	return (
		<div>
			<h1>Calculadora de HP</h1>
			<div>
				<div>
					<div>
						<h3>Atributos</h3>
						<div>
							<div>
								<FormSelect content={playerClasses} text='Classe: ' inputId='PlayerClass' eventHandler={changeClass} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}