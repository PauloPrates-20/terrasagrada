import { GiRuneStone } from 'react-icons/gi';
import { MagicItem, RarityStrings } from '../lib/definitions';

export default function Wondrous({ 
  item, 
  rarity,
  clickHandler 
}: { 
  item: MagicItem; 
  rarity: RarityStrings;
  clickHandler: (item: MagicItem) => void
}) {
  return (
    <li 
      className={`text-sm flex justify-between items-center py-1 px-2 md:text-base hover:cursor-pointer hover:shadow-[0_0_24px_8px_#4406067f_inset]`}
      onClick={() => clickHandler(item)}
    >
      <p className={`w-3/5 text-start ${rarity}`}>
        <span className='text-titleColor align-middle pr-1'><GiRuneStone size='1.5rem'/></span>
        {item.name}
      </p>
      <p className='text-gold text-end'>
        {item.value} PO
      </p>
    </li>
  );
}