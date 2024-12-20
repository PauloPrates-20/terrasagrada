'use client';

import { useState, useEffect } from 'react';
import { SpellInterface } from '@/app/lib/definitions';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import FormSelect from '@/app/components/FormSelect';
import Spell from '@/app/components/Spell';

export default function Grimorio() {
  const schools = [
    { name: 'Selecionar escola de magia', value: 'none' },
    { name: 'Abjuração', value: 'abjuracao' },
    { name: 'Advinhação', value: 'advinhacao' },
    { name: 'Conjuração', value: 'conjuracao' },
    { name: 'Encantamento', value: 'encantamento' },
    { name: 'Evocação', value: 'evocacao' },
    { name: 'Ilusão', value: 'ilusao' },
    { name: 'Necromancia', value: 'necromancia' },
    { name: 'Transmutação', value: 'transmutacao' },
  ];

  const [mage, setMage] = useState('none');
  const [count, setCount] = useState(1);
  const [prev, setPrev] = useState(count);
  const [number, setNumber] = useState([1]);
  const [spells, setSpells] = useState<SpellInterface[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  function getSpells(index: number, data: SpellInterface) {
    const newSpells = [...spells];
    newSpells[index] = data;
    setSpells(newSpells);
  }

  function calculateSpell(spells: SpellInterface[], mage: string): { price: number, time: number } {
    let time = 0;
    let price = 0;

    spells.forEach((spell) => {
      if (mage === spell.school) {
        price += spell.price === 0 ? 0 : 50 * spell.level / 2;
        time += spell.time === 0 ? 0 : 2 * spell.level / 2;
      } else {
        price += spell.price === 0 ? 0 : 50 * spell.level;
        time += spell.time === 0 ? 0 : 2 * spell.level;
      }
    });

    return { price, time };
  }

  useEffect(() => {
    if (count > prev) setNumber(state => [...state, count]);
    else if (count < prev) {
      const tempNum = [...number];
      const tempSpells = [...spells];
      tempSpells.pop();
      tempNum.pop();
      setNumber(tempNum);
      setSpells(tempSpells);
    }
    setPrev(count);
  }, [count]);

  useEffect(() => {
    let result = calculateSpell(spells, mage);
    setTotalCost(result.price);
    setTotalTime(result.time);
  }, [spells, mage]);

	return (
		<div className='flex flex-col justify-start items-center border border-titleColor rounded-xl min-h-96 py-6 mt-12 lg:w-1/2 md:my-12 md:mx-auto'>
      <h1 className='text-titleColor text-3xl font-bold'>Grimório do Mago</h1>
      <div className='my-4'>
        <FormSelect content={schools} text='Tradição arcana do mago: ' inputId='mageSchool' eventHandler={(value: string) => setMage(value)} />
      </div>
      <div>
        <p>Custo: <span>{totalCost} PO</span></p>
        <p>Tempo: <span>{totalTime} {totalTime === 1 ? 'Hora' : 'Horas'}</span></p>
      </div>
      <div>
        <div className='mt-8 mb-4 flex justify-center items-center'>
          <h3 className='text-titleColor text-3xl font-bold self-start pr-4'>Magias</h3>
          <button onClick={() => setCount(count + 1)} className='border-none bg-transparent text-titleColor pr-2'>
            <FaPlusSquare size='1.5rem'/>
          </button>
          <button onClick={() => {if (count > 1) setCount(count - 1)}} className='border-none bg-transparent text-titleColor pr-2'>
            <FaMinusSquare size='1.5rem'/>
          </button>
        </div>
        <div>
          {number.map((spell, index) => (
            <Spell 
              sendData={getSpells}
              key={index}
              schools={schools}
              lvlId={`lvl${index}`}
              schoolId={`school${index}`}
              mage={mage}
              spellId={spell}
            />
          ))}
        </div>
      </div>
    </div>
	);
}