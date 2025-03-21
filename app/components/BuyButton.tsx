import { Item } from "../lib/definitions";
import { buyItem } from "../lib/actions";

interface Props {
  id: number,
  name: string,
  value: number,
}

export default function BuyButton({ id, name, value } : Props){
  const item: Item = {
    id: id,
    name: name,
    value: value,
    url: ''
  };

  function handleClick() {
    buyItem(item).then((res) => window.alert(res));
  }

  return (
    <button
      onClick={handleClick}
      className='py-4 px-2 border border-titleColor rounded-md w-24 font-bold'
    >
      Buy
    </button>
  );
}