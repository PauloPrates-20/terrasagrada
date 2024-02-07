import {GiHearts, GiSparkles, GiAnvilImpact, GiBookCover} from 'react-icons/gi'

import ListCard from "./ListCard"

export default function Ferramentas({ clickHandler }) {
  return (
    <>
      <a href='/ferramentas/calculadorahp'>
        <ListCard icon={<GiHearts />} text='Calculadora de HP' clickHandler={clickHandler} />
      </a>
      <a href='/ferramentas/conjurador'>
        <ListCard icon={<GiSparkles />} text='Nível de Conjurador' clickHandler={clickHandler} />
      </a>
      <a href='/ferramentas/crafting'>
        <ListCard icon={<GiAnvilImpact />} text='Calculadora do Artesão' clickHandler={clickHandler} />
      </a>
      <a href='/ferramentas/grimorio'>
        <ListCard icon={<GiBookCover />} text='Grimório do Mago' clickHandler={clickHandler} />
      </a>
    </>
  )
}