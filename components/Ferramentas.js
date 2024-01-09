import {GiHearts, GiSparkles, GiAnvilImpact, GiBookCover} from 'react-icons/gi'

import Link from "next/link"
import ListCard from "./ListCard"

export default function Ferramentas({ clickHandler }) {
  return (
    <>
      <Link href='/ferramentas/calculadorahp'>
        <ListCard icon={<GiHearts />} text='Calculadora de HP' clickHandler={clickHandler} />
      </Link>
      <Link href='/ferramentas/conjurador'>
        <ListCard icon={<GiSparkles />} text='Nível de Conjurador' clickHandler={clickHandler} />
      </Link>
      <Link href='/ferramentas/crafting'>
        <ListCard icon={<GiAnvilImpact />} text='Calculadora do Artesão' clickHandler={clickHandler} />
      </Link>
      <Link href='/ferramentas/grimorio'>
        <ListCard icon={<GiBookCover />} text='Grimório do Mago' clickHandler={clickHandler} />
      </Link>
    </>
  )
}