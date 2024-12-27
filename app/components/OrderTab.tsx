import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { OrderingOptions } from './ContentList';

export default function OrderTab({ changeOrder }: { changeOrder: (options : OrderingOptions) => void}) {
  const [nameCaret, setNameCaret] = useState<boolean | undefined>(true);
  const [priceCaret, setPriceCaret] = useState<boolean | undefined>(undefined);

  function handleClick(caret: string): undefined {
    switch(caret) {
      case 'name':
        setNameCaret(typeof nameCaret === 'undefined' ? true : !nameCaret);
        setPriceCaret(undefined);
        break;
      case 'price':
        setPriceCaret(typeof priceCaret === 'undefined' ? true : !priceCaret);
        setNameCaret(undefined);
        break;
    }
  }

  useEffect(() => {
    if (typeof nameCaret !== 'undefined') changeOrder({ attribute: 'name', order: nameCaret });
    else if (typeof priceCaret !== 'undefined') changeOrder({ attribute: 'price', order: priceCaret});
  }, [ nameCaret, priceCaret]);
  
  return (
    <li className='flex text-titleColor font-bold justify-between items-center w-full select-none'>
      <p 
        className='border border-titleColor px-2 w-11/12 text-left flex items-center justify-between hover:cursor-pointer'
        onClick={() => handleClick('name')}
      >
        ITEM {typeof nameCaret !== 'undefined' ? nameCaret ? <FaCaretDown /> : <FaCaretUp /> : ''}
      </p>
      <p 
        className='border border-titleColor px-2 flex justify-between items-center hover:cursor-pointer'
        onClick={() => handleClick('price')}
      >
        PRICE {typeof priceCaret !== 'undefined' ? priceCaret ? <FaCaretDown /> : <FaCaretUp /> : ''}
      </p>
    </li>
  );
}