import { ItemTypes, SetTypes } from '../lib/definitions';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { ReactNode, useState } from 'react';
import ListItem from './ListItem';

export default function ContentList({
  dataSet,
  icon,
  clickHandler,
}: {
  dataSet: SetTypes;
  icon: ReactNode;
  clickHandler: (item: ItemTypes) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center w-4/5 h-auto'>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`text-sm md:text-base py-2 px-3 border border-titleColor bg-neutral-700 w-full flex justify-between items-end gap-4 hover:bg-neutral-800 hover:cursor-pointer ${dataSet.rarity}`}
      >
        {dataSet.label} {expanded ? <FaMinusSquare size='1.4rem' /> : <FaPlusSquare size='1.4rem' />}
      </button>
      <div className={`w-full overflow-hidden ${expanded ? 'max-h-fit' : 'max-h-0'}`}>
        <ul>
          <li className='flex text-titleColor font-bold justify-between items-center w-full'>
            <p className='border border-titleColor px-2 w-11/12 text-left'>ITEM</p>
            <p className='border border-titleColor px-2'>PRICE</p>
          </li>
          {dataSet.items.map((item, index) => (
            <ListItem icon={icon} item={item} rarity={dataSet.rarity} key={index} clickHandler={clickHandler} />
          ))}
        </ul>
      </div>
    </div>
  );
}