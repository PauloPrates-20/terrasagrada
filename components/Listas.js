import {GiCauldron, GiGems, GiHorseHead, GiCrossedSwords, GiMightySpanner} from 'react-icons/gi'
import Link from "next/link"
import ListCard from "./ListCard"

export default function Listas({ clickHandler }) {
  return (
    <>
      <Link href='/listas/consumiveis'>
        <ListCard icon={<GiCauldron />} text='Consumíveis' clickHandler={clickHandler} />
      </Link>
      <Link href='/listas/itensmagicos'>
        <ListCard icon={<GiGems />} text='Itens Mágicos' clickHandler={clickHandler} />
      </Link>
      <Link href='/listas/montarias'>
        <ListCard icon={<GiHorseHead />} text='Montarias' clickHandler={clickHandler} />
      </Link>
      <Link href='/listas/mundanos'>
        <ListCard icon={<GiCrossedSwords />} text='Itens Mundanos' clickHandler={clickHandler} />
      </Link>
      <Link href='/listas/artifice'>
        <ListCard icon={<GiMightySpanner />} text='Infusões de Artífice' clickHandler={clickHandler} />
      </Link>
    </>
  )
}