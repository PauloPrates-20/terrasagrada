import { useState, useEffect } from 'react'

import styles from '@/styles/Crafting.module.css'
import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

function calcPrice(price, tax) {
  let total = Math.ceil(price * tax)
  return total
}

function calcTime(price, ve) {
  let time = Math.ceil(price / ve)
  return time
}

export default function Crafting() {
  const tiers = [
    { nome: 'Iniciante', value: 25 },
    { nome: 'Cobre', value: 50 },
    { nome: 'Prata', value: 100 },
    { nome: 'Ouro', value: 250 },
    { nome: 'Platina', value: 500 },
    { nome: 'Cobalto', value: 1000 },
    { nome: 'Adamante', value: 2500 }
  ]
  
  const raridade = [
    { nome: 'Comum', value: 0.65 },
    { nome: 'Incomum', value: 0.7 },
    { nome: 'Raro', value: 0.75 },
    { nome: 'Muito Raro', value: 0.8 },
    { nome: 'Lendário', value: 0.85 },
  ]

  const [ve, setVe] = useState(25)
  const [tax, setTax] = useState(0.65)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [time, setTime] = useState(0)

  const changeVe = (value) => {
    setVe(value * 1)
  }

  const changeTax = (value) => {
    setTax(value * 1)
  }

  const changePrice = (value) => {
    setPrice(value * 1)
    console.log(value)
  }

  useEffect(() => {
    setTotal(calcPrice(price, tax))
  }, [price, tax])

  useEffect(() => {
    setTime(calcTime(total, ve))
  }, [total, ve])

  return (
    <div className={styles.frame}>
      <h1>Calculadora do artesão</h1>
      <div className={styles.data_frame}>
        <div className={styles.input_frame}>
          <h3>Projeto</h3>
          <div className={styles.inputs}>
            <FormSelect content={tiers} text='Tier do Artesão: ' inputId='selectTier' eventHandler={changeVe} />
            <FormSelect content={raridade} text='Raridade do Item: ' inputId='rarity' eventHandler={changeTax} />
            <FormInput inputId='price' text='Valor do Item: ' type='number' min={0} max={100000} defVal={0} eventHandler={changePrice} />
          </div>
        </div>
        <div className={styles.output_frame}>
          <h3>Resultado</h3>
          <p>Custo de fabricação: <span>{total} PO</span> </p>
          <p>Tempo necessário: <span>{time} dias</span> </p>
        </div>
      </div>
    </div>
  )
}