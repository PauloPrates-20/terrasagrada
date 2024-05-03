import { useState, useEffect } from 'react'

import styles from '@/styles/Crafting.module.css'
import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

function calcTime(price, ve) {
  let time = Math.ceil(price / ve)
  return time
}

export default function Crafting() {
  const tiers = [
    { nome: 'Iniciante', value: 15 },
    { nome: 'Cobre', value: 30 },
    { nome: 'Prata', value: 75 },
    { nome: 'Ouro', value: 120 },
    { nome: 'Platina', value: 200 },
    { nome: 'Cobalto', value: 500 },
    { nome: 'Adamante', value: 750 }
  ]
  
  const raridade = [
    { nome: 'Comum', value: 10 },
    { nome: 'Incomum', value: 12 },
    { nome: 'Raro', value: 16 },
    { nome: 'Muito Raro', value: 20 },
    { nome: 'Lendário', value: 22 },
  ]

  const [ve, setVe] = useState(25)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [time, setTime] = useState(0)
  const [cd, setCd] = useState(10)
  const [consumivel, setConsumivel] = useState(0)

  const changeVe = (value) => {
    setVe(value * 1)
  }

  const changePrice = (value) => {
    setPrice(Math.ceil(value * 0.8))
  }

  const changeCd = (value) => {
    setCd(value)
  }

  const toggleConsumivel = (value) => {
    setConsumivel(value * 1)
  }

  useEffect(() => {
    if(consumivel != 0) {
      setTotal(price / consumivel)
    }
    else {
      setTotal(price)
    }
  }, [consumivel, price])

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
            <FormSelect content={raridade} text='Raridade do Item: ' inputId='rarity' eventHandler={changeCd} />
            <FormInput inputId='price' text='Valor do Item: ' type='number' min={0} max={100000} defVal={0} eventHandler={changePrice} />
            <FormInput inputId='consumivel' text='Consumível? ' type='checkbox' defVal={2} eventHandler={toggleConsumivel} />
          </div>
        </div>
        <div className={styles.output_frame}>
          <h3>Resultado</h3>
          <p>Custo de fabricação: <span>{total} PO</span> </p>
          <p>Tempo necessário: <span>{time} dias</span> </p>
          <p>CD dos testes: {cd}</p>
        </div>
      </div>
    </div>
  )
}