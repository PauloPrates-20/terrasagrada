import { MundaneItem, MundaneSet } from '../lib/definitions';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { useState } from 'react';
import Mundane from './Mundane';
export default function MundaneContent({ dataSet, clickHandler }: { dataSet: MundaneSet; clickHandler: (item: MundaneItem) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className='flex flex-col justify-center items-center w-4/5 h-auto'>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`text-base py-2 px-3 border border-titleColor bg-neutral-700 w-full flex justify-between items-end gap-4 hover:bg-neutral-800 hover:cursor-pointer ${dataSet.rarity}`}
      >
        {dataSet.label} {expanded ? <FaMinusSquare size='1.4rem' /> : <FaPlusSquare size='1.4rem' />}
      </button>
      <div className={`w-full overflow-hidden ${expanded ? 'max-h-fit' : 'max-h-0'}`}>
        <ul>
          {dataSet.items.map((item, index) => (
            <Mundane item={item} rarity={dataSet.rarity} key={index} clickHandler={clickHandler} />
          ))}
        </ul>
      </div>
    </div>
  );
}