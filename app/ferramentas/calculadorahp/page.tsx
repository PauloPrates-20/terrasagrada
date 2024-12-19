'use client'

import { useState, useEffect } from 'react';
import FormSelect from '@/app/components/FormSelect';
import FormInput from '@/app/components/FormInput';
import MultClass from '@/app/components/MultClass';

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
	const [draconicSorcerer, setDraconicSorcerer] = useState<number | boolean>(false);
	const [hillDwarf, setHillDwarf] = useState<number | boolean>(false);
	const [tough, setTough] = useState<number | boolean>(false);
	const [out, setOut] = useState(0);
	const [first, setFirst] = useState(0);
	const [next, setNext] = useState(0);
	const [sorcerer, setSorcerer] = useState(false);

	let results: { out: number; firstHp: number; nextHp: number } = {
		out: 0,
		firstHp: 0,
		nextHp: 0,
	};

	function calculateOuput(
		dice: number,
		lvl: number,
		con: number,
		draconicSorcerer: number | boolean,
		hillDwarf: number | boolean,
		tough: number | boolean,
		multDice: { one: number, two: number, three: number },
		multLvl: { one: number, two: number, three: number },
		multClass: { one: string, two: string, three: string },
		playerClass: string
	): { out: number; firstHp: number; nextHp: number; } {
		let out = 0;
		let hillDwarfMod = typeof hillDwarf === 'number' ? hillDwarf : 0;
		let draconicSorcererMod = typeof draconicSorcerer === 'number' ? draconicSorcerer : 0;
		let draconicSorcererBonus = 0;
		let toughMod = typeof tough === 'number' ? tough : 0;
		let firstHp = dice + con + hillDwarfMod + draconicSorcererMod + toughMod;
		let nextHp = (dice / 2 + 1) + con + toughMod + hillDwarfMod;
		let multOneHp = multDice.one !== 0 ? ((multDice.one / 2) + 1 + con + hillDwarfMod + toughMod) * multLvl.one : 0;
		let multTwoHp = multDice.two !== 0 ? ((multDice.two / 2) + 1 + con + hillDwarfMod + toughMod) * multLvl.two : 0;
		let multThreeHp = multDice.three !== 0 ? ((multDice.three / 2) + 1 + con + hillDwarfMod + toughMod) * multLvl.three : 0;

		if (lvl === 1 && multDice.one === 0) out = firstHp;
		else out = firstHp + nextHp * (lvl - 1) + multOneHp + multTwoHp + multThreeHp;

		if (playerClass === 'feiticeiro') {
			firstHp += draconicSorcererMod;
			draconicSorcererBonus = draconicSorcererMod * lvl;
		}
		else if (multClass.one === 'feiticeiro') draconicSorcererBonus = draconicSorcererMod * multLvl.one;
		else if (multClass.two === 'feiticeiro') draconicSorcererBonus = draconicSorcererMod * multLvl.two;
		else if (multClass.three === 'feiticeiro') draconicSorcererBonus = draconicSorcererMod * multLvl.three;

		out += draconicSorcererBonus;

		return { out: out, firstHp: firstHp, nextHp: nextHp };
	}

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

	function changeMultClass(value: string, id?: string) {
		if (value in hitDices) {
			switch (id) {
				case 'multOne':
					if (value == 'none') {
						setMultClass({ one: value, two: value, three: value });
						setMultHitDice({ one: 0, two: 0, three: 0 });
					}
					else {
						setMultClass(state => ({ ...state, one: value }));
						setMultHitDice(state => ({ ...state, one: hitDices[value as keyof typeof hitDices] }));
					}
					break;
	
				case 'multTwo':
					if (value == 'none') {
						setMultClass(state => ({ ...state, two: value, three: value }));
						setMultHitDice(state => ({ ...state, two: 0, three: 0 }));
					}
					else {
						setMultClass(state => ({ ...state, two: value }));
						setMultHitDice(state => ({ ...state, two: hitDices[value as keyof typeof hitDices] }));
					}
					break;
	
				case 'multThree':
					if (value == 'none') {
						setMultClass(state => ({ ...state, three: value }));
						setMultHitDice(state => ({ ...state, three: 0 }));
					}
					else {
						setMultClass(state => ({ ...state, three: value }));
						setMultHitDice(state => ({ ...state, three: hitDices[value as keyof typeof hitDices] }));
					}
					break;
			}
		}
	}

	function changeMultLvl(value: string | boolean, id?: string) {
		const convertedValue = parseInt(value as string);

		switch (id) {
      case 'multLvl1':
        setMultLvl(state => ({ ...state, one: convertedValue }));
        break;

      case 'multLvl2':
        setMultLvl(state => ({ ...state, two: convertedValue }));
        break;

      case 'multLvl3':
        setMultLvl(state => ({ ...state, three: convertedValue }));
        break;
    }
	}

	function changeLvl(value: string | boolean) {
		setLvl(parseInt(value as string));
	}
	
	function changeCon(value: string | boolean) {
		const convertedValue = parseInt(value as string);

		setCon(convertedValue);
		setConMod(Math.floor((convertedValue - 10) / 2));
	}

	function toggleDraconicSorcerer(value: string | boolean) {
		if (typeof value === 'string') setDraconicSorcerer(parseInt(value));
		else setDraconicSorcerer(value);
	}

	function toggleHillDwarf(value: string | boolean) {
		if (typeof value === 'string') setHillDwarf(parseInt(value));
		else setHillDwarf(value);
	}

	function toggleTough(value: string | boolean) {
		if (typeof value === 'string') setTough(parseInt(value));
		else setTough(value);
	}

	useEffect(() => {
		results = calculateOuput(hitDice, lvl, conMod, draconicSorcerer, hillDwarf, tough, multHitDice, multLvl, multClass, playerClass);
		setOut(results.out);
		setFirst(results.firstHp);
		setNext(results.nextHp);
	}, [hitDice, lvl, conMod, draconicSorcerer, hillDwarf, tough, multClass, multLvl, playerClass]);

	useEffect(() => {
		if (multClass.one === 'feiticeiro' || multClass.two === 'feiticeiro' || multClass.three === 'feiticeiro' || playerClass === 'feiticeiro') setSorcerer(true);
		else {
			setSorcerer(false);
			setDraconicSorcerer(false);
		}
	}, [multClass, playerClass]);

	return (
		<div className='my-12 mx-auto flex flex-col justify-center items-center border border-titleColor w-11/12 rounded-xl py-8 px-0 text-sm'>
			<h1 className='mb-20 text-2xl font-bold text-titleColor'>Calculadora de HP</h1>
			<div className='flex flex-col justify-center items-center gap-20 md:flex-row md:text-lg md:justify-between'>
				<div className='flex flex-col justify-center items-center'>
					<div className='flex flex-col justify-center items-center'>
						<h3 className='pb-4 font-bold text-titleColor'>Atributos</h3>
						<div className='flex flex-col justify-center items-center'>
							<div className='flex justify-center items-center gap-4 mb-8'>
								<FormSelect content={playerClasses} text='Classe: ' inputId='PlayerClass' eventHandler={changeClass} />
								<FormInput type='number' inputId='lvl' text='Nível: 'min={1} max={20} size={2} defVal={1} eventHandler={changeLvl} />
							</div>
							<h3 className='pb-4 font-bold text-titleColor'>Multiclasse</h3>
							<div className='flex flex-col justify-center items-center flex-nowrap'>
								<div className='flex justify-center items-center gap-4 mb-8'>
									<MultClass content={playerClasses} text='Multiclasse #1: ' inputId='multOne' eventHandler={changeMultClass} />
									<FormInput type='number' inputId='multLvl1' text='Nível: ' min={1} max={20} size={2} defVal={1} eventHandler={changeMultLvl} />
								</div>
								{multClass.one !== 'none' && (
									<div className='flex justify-center items-center gap-4 mb-8'>
										<MultClass content={playerClasses} text='Multiclasse #2: ' inputId='multTwo' eventHandler={changeMultClass} />
										<FormInput type='number' inputId='multLvl2' text='Nível: ' min={1} max={20} size={2} defVal={1} eventHandler={changeMultLvl} />
									</div>
								)}
								{multClass.two !== 'none' && (
									<div className='flex justify-center items-center gap-4 mb-8'>
										<MultClass content={playerClasses} text='Multiclasse #3: ' inputId='multThree' eventHandler={changeMultClass} />
										<FormInput type='number' inputId='multLvl3' text='Nível: ' min={1} max={20} size={2} defVal={1} eventHandler={changeMultLvl} />
									</div>
								)}
							</div>
							<div className='flex flex-col justify-between items-center border border-titleColor w-fit py-4 px-4 rounded-xl'>
								<p className='text-titleColor'>Constituição</p>
								<p className='text-2xl py-4 px-0'>{conMod}</p>
								<FormInput type='number' inputId='con' defVal={10} min={0} max={30} size={2} eventHandler={changeCon} />
							</div>
						</div>
					</div>
					<div className='mt-4 md:mb-8'>
						<h3 className='mb-2 pb-4 font-bold text-titleColor'>Características</h3>
						<FormInput type='checkbox' text='Anão da colina? ' inputId='dwarf' eventHandler={toggleHillDwarf} defVal={1} />
						<FormInput type='checkbox' text='Talento Robusto? ' inputId='feat' eventHandler={toggleTough} defVal={2} />
						{sorcerer && (
							<FormInput type='checkbox' text='Feiticeiro Dracônico? ' inputId='dragon' eventHandler={toggleDraconicSorcerer} defVal={1} />
						)}
					</div>
				</div>
				<div className='text-titleColor'>
					<h3 className='pb-4 font-bold'>HP total: <span className='text-textColor'>{out}</span></h3>
					<p>Dado de vida: <span className='text-textColor'>1d{hitDice}</span></p>
					<p>HP no 1º nível: <span className='text-textColor'>{first}</span></p>
					<p>HP nos níveis seguintes: <span className='text-textColor'>{next}</span></p>
				</div>
			</div>
		</div>
	);
}