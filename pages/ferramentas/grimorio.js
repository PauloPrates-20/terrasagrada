import { useEffect, useState } from 'react'
import { FaSquarePlus, FaSquareMinus } from 'react-icons/fa6'

import styles from '@/styles/Grimorio.module.css'

import FormSelect from '@/components/FormSelect'
import Spell from '@/components/Spell'

function calcSpell(spells) {
  let hours = 0
  let price = 0
  spells.forEach((spell) => {
    hours += spell.time
    price += spell.price
  })
  return {cost: price, time: hours}
}

export default function Grimorio() {
  const schools = [
    { nome: 'Selecionar escola de magia', value: 'none' },
    { nome: 'Abjuração', value: 'abjuracao' },
    { nome: 'Advinhação', value: 'advinhacao' },
    { nome: 'Conjuração', value: 'conjuracao' },
    { nome: 'Encantamento', value: 'encantamento' },
    { nome: 'Evocação', value: 'evocacao' },
    { nome: 'Ilusão', value: 'ilusao' },
    { nome: 'Necromancia', value: 'necromancia' },
    { nome: 'Transmutação', value: 'transmutacao' },
  ]

  const [mage, setMage] = useState('none')
  const [count, setCount] = useState(1)
  const [prev, setPrev] = useState(count)
  const [number, setNumber] = useState([1])
  const [spells, setSpells] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const changeSchool = (value) => {
    setMage(value)
  }

  const getSpells = (index, data) => {
    const spellImport = [...spells]
    spellImport[index] = data
    setSpells(spellImport)
  }

  useEffect(() => {
    if (count > prev) {
      setNumber(state => [...state, count])
    }
    else if (count < prev) {
      const tempNum = [...number]
      const tempSpells = [...spells]
      tempSpells.pop()
      tempNum.pop()
      setNumber(tempNum)
      setSpells(tempSpells)

    }
    setPrev(count)
  }, [count])

  useEffect(() => {
    let calculation = calcSpell(spells)
    setTotalCost(calculation.cost)
    setTotalTime(calculation.time)
  }, [spells])

  return (
    <div className={styles.frame}>
      <h1>Grimório do Mago</h1>
      <div className={styles.mago}>
        <FormSelect eventHandler={changeSchool} content={schools} text='Tradição arcana do mago: ' inputId='mageSchool' />
      </div>
      <div>
        <p>Custo: <span>{totalCost} PO</span></p>
        <p>Tempo: <span>{totalTime} {totalTime == 1 ? 'Hora' : 'Horas'}</span></p>
      </div>
      <div>
        <div className={styles.spell_header}>
          <h3>Magias</h3>
          <button onClick={increment} className={styles.symbol}><FaSquarePlus /></button>
          <button onClick={decrement} className={styles.symbol}><FaSquareMinus /></button>
        </div>
        <div className={styles.spell_body}>
          {number.map((spell, index) => (
            <Spell sendData={getSpells} key={index} schools={schools} spellId={spell} lvlId={`lvl${index}`} schoolId={`school${index}`} mage={mage} />
          ))}
        </div>
      </div>
    </div>
  )
}