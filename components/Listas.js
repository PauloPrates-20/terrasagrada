import {GiCauldron, GiGems, GiHorseHead, GiCrossedSwords, GiMightySpanner} from 'react-icons/gi'
import ListCard from "./ListCard"

export default function Listas({ clickHandler }) {
  return (
    <>
      <a href='/listas/consumiveis'>
        <ListCard icon={<GiCauldron />} text='Consumíveis' clickHandler={clickHandler} />
      </a>
      <a href='/listas/itensmagicos'>
        <ListCard icon={<GiGems />} text='Itens Mágicos' clickHandler={clickHandler} />
      </a>
      <a href='/listas/mundanos'>
        <ListCard icon={<GiCrossedSwords />} text='Itens Mundanos' clickHandler={clickHandler} />
      </a>
      <a href='/listas/artifice'>
        <ListCard icon={<GiMightySpanner />} text='Infusões de Artífice' clickHandler={clickHandler} />
      </a>
    </>
  )
}