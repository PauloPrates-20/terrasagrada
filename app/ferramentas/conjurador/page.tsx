'use client';

import { use, useEffect, useState } from 'react';
import { SpellSlot } from '@/app/lib/definitions';
import { fullTable, halfTable, warlockTable, subTable, artificeTable } from '@/app/lib/tables';
import CasterList from '@/app/components/CasterList';
import CasterSlots from '@/app/components/CasterSlots';

export default function Conjurador() {
	const slots: SpellSlot[] = [
		{ level: '1st', quantity: 0 },
		{ level: '2nd', quantity: 0 },
		{ level: '3rd', quantity: 0 },
		{ level: '4th', quantity: 0 },
		{ level: '5th', quantity: 0 },
		{ level: '6th', quantity: 0 },
		{ level: '7th', quantity: 0 },
		{ level: '8th', quantity: 0 },
		{ level: '9th', quantity: 0 }
	];

  const warlockSlots: SpellSlot[] = [
    { level: '1st', quantity: 0 },
    { level: '2nd', quantity: 0 },
    { level: '3rd', quantity: 0 },
    { level: '4th', quantity: 0 },
    { level: '5th', quantity: 0 }
  ];

  const casterClasses = [
    { value: 'artifice', name: 'Artífice', type: 'half' },
    { value: 'bardo', name: 'Bardo', type: 'full' },
    { value: 'clerigo', name: 'Clérigo', type: 'full' },
    { value: 'druida', name: 'Druida', type: 'full' },
    { value: 'feiticeiro', name: 'Feiticeiro', type: 'full' },
    { value: 'mago', name: 'Mago', type: 'full' },
    { value: 'paladino', name: 'Paladino', type: 'half' },
    { value: 'patrulheiro', name: 'Patrulheiro', type: 'half' },
    { value: 'cavMist', name: 'Cavaleiro Místico', type: 'sub' },
    { value: 'trapArc', name: 'Trapaceiro Arcano', type: 'sub' },
    { value: 'bruxo', name: 'Bruxo', type: 'short' }
  ];

  const casterProperty = {
    artifice: { type: 'half', level: 0 },
    bardo: { type: 'full', level: 0 },
    clerigo: { type: 'full', level: 0 },
    druida: { type: 'full', level: 0 },
    feiticeiro: { type: 'full', level: 0 },
    mago: { type: 'full', level: 0 },
    paladino: { type: 'half', level: 0 },
    patrulheiro: { type: 'half', level: 0 },
    cavMist: { type: 'sub', level: 0 },
    trapArc: { type: 'sub', level: 0 },
    bruxo: { type: 'short', level: 0 }
  };

  const [classLvl, setClassLvl] = useState(casterProperty);
  const [casterLvl, setCasterLvl] = useState(0);
  const [totalLvl, setTotalLvl] = useState(0);
  const [warlock, setWarlock] = useState(0);
  const [spells, setSpells] = useState(slots);
  const [warlocSpells, setWarlockSpells] = useState(warlockSlots);
  const [table, setTable] = useState(fullTable);

  function getLevel(levels: any): { level: number; casterLevel: number; warlockLevel: number; } {
    let level = 0;
    let casterLevel = 0;
    let warlockLevel = 0;

    for (const property in levels) {
      switch(levels[property].type) {
        case 'half':
          casterLevel += Math.floor(levels[property].level / 2);
          level += levels[property].level;
          break;
        case 'sub':
          casterLevel += Math.floor(levels[property].level / 3);
          level += levels[property].level;
          break;
        case 'full':
          casterLevel += levels[property].level;
          level += levels[property].level;
          break;
        case 'short':
          warlockLevel = levels[property].level;
          break;
      }
    }
    
    casterLevel = Math.min(casterLevel, 20);
    return { level, casterLevel, warlockLevel };
  }

  function changeClassLvl(value: string, lvl: number) {
    if (value in casterProperty) {
      setClassLvl(state => ({ ...state, [value]: { type: classLvl[value as keyof typeof casterProperty].type, level: lvl}}));
    }
  }

  useEffect(() => {
    let levels = getLevel(classLvl);
    setCasterLvl(levels.casterLevel);
    setWarlock(levels.warlockLevel);
    setTotalLvl(levels.level);
  }, [classLvl]);

  useEffect(() => {
    setWarlockSpells([
      { level: '1st', quantity: warlockTable[warlock].first },
      { level: '2nd', quantity: warlockTable[warlock].second },
      { level: '3rd', quantity: warlockTable[warlock].third },
      { level: '4th', quantity: warlockTable[warlock].fourth },
      { level: '5th', quantity: warlockTable[warlock].fifth }
    ]);
    
    setTable(fullTable);

    if (totalLvl > 0) {
      if (classLvl.artifice.level == totalLvl) {
        setTable(artificeTable)
      }
      else if (classLvl.paladino.level == totalLvl) {
        setTable(halfTable)
      }
      else if (classLvl.patrulheiro.level == totalLvl) {
        setTable(halfTable)
      }
      else if (classLvl.cavMist.level == totalLvl) {
        setTable(subTable)
      }
      else if (classLvl.trapArc.level == totalLvl) {
        setTable(subTable)
      }
    }
  }, [totalLvl, warlock]);

  useEffect(() => {
    setSpells([
      { level: '1st', quantity: table[casterLvl].first },
      { level: '2nd', quantity: table[casterLvl].second },
      { level: '3rd', quantity: table[casterLvl].third },
      { level: '4th', quantity: table[casterLvl].fourth },
      { level: '5th', quantity: table[casterLvl].fifth },
      { level: '6th', quantity: table[casterLvl].sixth },
      { level: '7th', quantity: table[casterLvl].seventh },
      { level: '8th', quantity: table[casterLvl].eighth },
      { level: '9th', quantity: table[casterLvl].nineth }
    ]);

    if (classLvl.artifice.level == totalLvl) {
      setSpells([
        { level: '1st', quantity: table[classLvl.artifice.level].first },
        { level: '2nd', quantity: table[classLvl.artifice.level].second },
        { level: '3rd', quantity: table[classLvl.artifice.level].third },
        { level: '4th', quantity: table[classLvl.artifice.level].fourth },
        { level: '5th', quantity: table[classLvl.artifice.level].fifth },
        { level: '6th', quantity: table[classLvl.artifice.level].sixth },
        { level: '7th', quantity: table[classLvl.artifice.level].seventh },
        { level: '8th', quantity: table[classLvl.artifice.level].eighth },
        { level: '9th', quantity: table[classLvl.artifice.level].nineth }
      ]);
    }
    else if (classLvl.paladino.level == totalLvl) {
      setSpells([
        { level: '1st', quantity: table[classLvl.paladino.level].first },
        { level: '2nd', quantity: table[classLvl.paladino.level].second },
        { level: '3rd', quantity: table[classLvl.paladino.level].third },
        { level: '4th', quantity: table[classLvl.paladino.level].fourth },
        { level: '5th', quantity: table[classLvl.paladino.level].fifth },
        { level: '6th', quantity: table[classLvl.paladino.level].sixth },
        { level: '7th', quantity: table[classLvl.paladino.level].seventh },
        { level: '8th', quantity: table[classLvl.paladino.level].eighth },
        { level: '9th', quantity: table[classLvl.paladino.level].nineth }
      ]);
    }
    else if (classLvl.patrulheiro.level == totalLvl) {
      setSpells([
        { level: '1st', quantity: table[classLvl.patrulheiro.level].first },
        { level: '2nd', quantity: table[classLvl.patrulheiro.level].second },
        { level: '3rd', quantity: table[classLvl.patrulheiro.level].third },
        { level: '4th', quantity: table[classLvl.patrulheiro.level].fourth },
        { level: '5th', quantity: table[classLvl.patrulheiro.level].fifth },
        { level: '6th', quantity: table[classLvl.patrulheiro.level].sixth },
        { level: '7th', quantity: table[classLvl.patrulheiro.level].seventh },
        { level: '8th', quantity: table[classLvl.patrulheiro.level].eighth },
        { level: '9th', quantity: table[classLvl.patrulheiro.level].nineth }
      ]);
    }
    else if (classLvl.cavMist.level == totalLvl) {
      setSpells([
        { level: '1st', quantity: table[classLvl.cavMist.level].first },
        { level: '2nd', quantity: table[classLvl.cavMist.level].second },
        { level: '3rd', quantity: table[classLvl.cavMist.level].third },
        { level: '4th', quantity: table[classLvl.cavMist.level].fourth },
        { level: '5th', quantity: table[classLvl.cavMist.level].fifth },
        { level: '6th', quantity: table[classLvl.cavMist.level].sixth },
        { level: '7th', quantity: table[classLvl.cavMist.level].seventh },
        { level: '8th', quantity: table[classLvl.cavMist.level].eighth },
        { level: '9th', quantity: table[classLvl.cavMist.level].nineth }
      ]);
    }
    else if (classLvl.trapArc.level == totalLvl) {
      setSpells([
        { level: '1st', quantity: table[classLvl.trapArc.level].first },
        { level: '2nd', quantity: table[classLvl.trapArc.level].second },
        { level: '3rd', quantity: table[classLvl.trapArc.level].third },
        { level: '4th', quantity: table[classLvl.trapArc.level].fourth },
        { level: '5th', quantity: table[classLvl.trapArc.level].fifth },
        { level: '6th', quantity: table[classLvl.trapArc.level].sixth },
        { level: '7th', quantity: table[classLvl.trapArc.level].seventh },
        { level: '8th', quantity: table[classLvl.trapArc.level].eighth },
        { level: '9th', quantity: table[classLvl.trapArc.level].nineth }
      ]);
    }
  }, [table, totalLvl]);

	return (
		<div className='flex flex-col-reverse justify-center items-center border border-titleColor rounded-2xl my-12 py-8 mx-auto md:flex-row md:p-20 md:items-start md:justify-start md:gap-[30%]'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-2xl text-titleColor my-2'>Nível de Conjurador</h2>
        <CasterList content={casterClasses} eventHandler={changeClassLvl} />
      </div>
      <div className='mb-8'>
        <div>
          <h2 className='text-2xl text-titleColor my-2'>Espaços de Magia</h2>
          <CasterSlots slots={spells} />
          {warlock > 0 && (
            <p className='my-4'>Recuperados com descanso longo</p>
          )}
        </div>
        {warlock > 0 && (
          <div>
            <h2 className='text-2xl text-titleColor my-2'>Espaços de Magia de Pacto</h2>
            <CasterSlots slots={warlocSpells} />
            <p className='my-4'>Recuperados com descanso curto</p>
          </div>
        )}
      </div>
    </div>
	);
}