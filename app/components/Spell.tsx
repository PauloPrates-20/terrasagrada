'use client';

import { useState, useEffect } from 'react';
import { SpellInterface } from '../lib/definitions';

export default function Spell({
  spellId,
  lvlId,
  schoolId,
  schools,
  mage,
  sendData
}: {
  spellId: number;
  lvlId: string;
  schoolId: string;
  schools: Array<{ name: string; value: string}>;
  mage: string;
  sendData: (spellId: number, details: SpellInterface) => void;
}) {
  const [details, setDetails] = useState<SpellInterface>({ school: 'none', price: 0, level: 1, time: 0});
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.id) {
      case lvlId:
        setDetails({ ...details, level: parseInt(e.target.value) });
        break;
      case schoolId:
        setDetails({ ...details, school: e.target.value });
        break;
    }
  }

  useEffect(() => {
    if (details.school !== 'none') {
      setDetails({ ...details, price: 50 * details.level, time: 2 * details.level });
      if (mage === details.school) {
        setPrice(50 * details.level / 2);
        setTime(2 * details.level / 2);
      } else {
        setPrice(50 * details.level);
        setTime(2 * details.level);
      }
    } else {
      setDetails({ ...details, price: 0, time: 0 });
      setPrice(0);
      setTime(0);
    }
  }, [details.level, details.school, mage]);

  useEffect(() => {
    sendData(spellId - 1, details);
  }, [details]);

  return (
    <div className='flex items-center justify-center gap-2 mb-2'>
      <div className='min-w-fit w-10 text-right pr-2 text-titleColor'>
        <p>#{spellId}</p>
      </div>
      <div className='flex justify-start items-center'>
        <div className='flex flex-col justify-center items-start text-left pr-2'>
          <div className='flex justify-center items-center'>
            <div className='w-14'>
              <label htmlFor={lvlId}>Nível: </label>
            </div>
            <select onChange={handleChange} id={lvlId} name={lvlId} className='text-black'>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </select>
          </div>
          <div className='flex justify-center items-center'>
            <div className='w-14'>
              <label htmlFor={schoolId}>Escola: </label>
            </div>
            <select onChange={handleChange} id={schoolId} name={schoolId} className='text-black'>
              {schools.map((school, index) => (
                <option key={index} value={school.value}>{school.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <p>Custo:</p>
            <p className='text-white'>{price} PO</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p>Tempo: </p>
            <p className='text-white'>{time} {time == 1 ? 'Hora' : 'Horas'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}