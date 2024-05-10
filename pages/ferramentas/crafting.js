import { useState, useEffect } from 'react'

import styles from '@/styles/Crafting.module.css'
import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

function calcTime(price, ve) {
  let time = Math.ceil(price / ve)
  return time
}

async function copyText(mensagem) {
  try {
    await navigator.clipboard.writeText(mensagem)
    console.log('Texto copiado')
  }
  catch (err) {
    console.log('Failed to copy: ', err)
  }
}

function addDays(date, days) {
  let newDate = new Date(date)

  newDate.setDate(newDate.getDate() + days)

  return newDate
}

let date = new Date()
let day = date.getDate()
let month = (date.getMonth() + 1)
let year = date.getFullYear()

export default function Crafting() {
  const ferramentas = [
    {nome: 'Ferramentas de Carpinteiro', value: 'Ferramentas de Carpinteiro',},
    {nome: 'Ferramentas de Cartógrafo', value: 'Ferramentas de Cartógrafo',},
    {nome: 'Ferramentas de Costureiro', value: 'Ferramentas de Costureiro',},
    {nome: 'Ferramentas de Coureiro', value: 'Ferramentas de Coureiro',},
    {nome: 'Ferramentas de Entalhador', value: 'Ferramentas de Entalhador',},
    {nome: 'Ferramentas de Ferreiro', value: 'Ferramentas de Ferreiro',},
    {nome: 'Ferramentas de Funileiro', value: 'Ferramentas de Funileiro',},
    {nome: 'Ferramentas de Joalheiro', value: 'Ferramentas de Joalheiro',},
    {nome: 'Ferramentas de Oleiro', value: 'Ferramentas de Oleiro',},
    {nome: 'Ferramentas de Pedreiro', value: 'Ferramentas de Pedreiro',},
    {nome: 'Ferramentas de Pintor', value: 'Ferramentas de Pintor',},
    {nome: 'Ferramentas de Sapateiro', value: 'Ferramentas de Sapateiro',},
    {nome: 'Ferramentas de Vidreiro', value: 'Ferramentas de Vidreiro',},
    {nome: 'Suprimentos de Alquimista', value: 'Suprimentos de Alquimista',},
    {nome: 'Suprimentos de Cervejeito', value: 'Suprimentos de Cervejeito',},
    {nome: 'Suprimentos de Caligrafia', value: 'Suprimentos de Caligrafia',},
    {nome: 'Utensílios de Cozinheiro', value: 'Utensílios de Cozinheiro',}
  ]
  const tiers = [
    { nome: 'Iniciante', value: 15 },
    { nome: 'Cobre', value: 30 },
    { nome: 'Prata', value: 75 },
    { nome: 'Ouro', value: 120 },
    { nome: 'Platina', value: 200 },
    { nome: 'Cobalto', value: 500 },
    { nome: 'Adamante', value: 750 }
  ]
  
  const raridades = [
    { nome: 'Comum', value: 10 },
    { nome: 'Incomum', value: 12 },
    { nome: 'Raro', value: 16 },
    { nome: 'Muito Raro', value: 20 },
    { nome: 'Lendário', value: 22 },
  ]

  const [ve, setVe] = useState(25)
  const [price, setPrice] = useState(0)
  const [priceAnterior, setPriceAnterior] = useState(0);
  const [priceNovo, setPriceNovo] = useState(0);
  const [total, setTotal] = useState(0)
  const [time, setTime] = useState(0)
  const [raridade, setRaridade] = useState('Comum')
  const [cd, setCd] = useState(10)
  const [consumivel, setConsumivel] = useState(0)
  const [artifice, setArtifice] = useState(false)
  const [upgrade, setUpgrade] = useState(false)
  const [mensagem, setMensagem] = useState()
  const [finalDate, setFinalDate] = useState(date)
  const [hour, setHour] = useState()
  const [copy, setCopy] = useState(false)
  const [personagem, setPersonagem] = useState('')
  const [item, setItem] = useState('')
  const [tool, setTool] = useState('')
  const changeVe = (value) => {
    setVe(value * 1)
  }

  const changePrice = (value) => {
    setPrice(Math.ceil(value * 0.8))
  }

  const changePriceAnterior = (value) => {
    setPriceAnterior(value * 1)
  }

  const changePriceNovo = (value) => {
    setPriceNovo(value * 1)
  }

  const changeCd = (value) => {
    setCd(value)
  }

  const changePersonagem = (value) => {
    setPersonagem(value)
  }

  const changeItem = (value) => {
    setItem(value)
  }

  const changeTool = (value) => {
    setTool(value)
  }

  const toggleConsumivel = (value) => {
    setConsumivel(value * 1)
  }

  const toggleArtifice = (value) => {
    setArtifice(value)
  }

  const toggleUpgrade = (value) => {
    setUpgrade(value)
  }

  const copyMessage = () => {
    setHour(`${date.getHours()}:${date.getMinutes()}`)
    setCopy(true)
  }

  useEffect(() => {
    priceNovo > priceAnterior && setPrice(Math.ceil((priceNovo - priceAnterior) * 0.8))
  }, [priceAnterior, priceNovo])

  useEffect(() => {
    let desconto = 1
    if(consumivel || artifice) {
      desconto = 2
      if(consumivel && artifice) {
        desconto = 4
      }
    }
    
    setTotal(Math.ceil(price / desconto))

  }, [consumivel, price, artifice])

  useEffect(() => {
    artifice ? setTime(Math.ceil(calcTime(total, ve) / 4)) :setTime(calcTime(total, ve))
  }, [total, ve])

  useEffect(() => {
    setFinalDate(addDays(date, time))
  }, [time])

  useEffect(() => {
    let raridadeTemp

    cd == 10 ? raridadeTemp = 'Comum' : cd == 12 ? raridadeTemp = 'Incomum' :
    cd == 16 ? raridadeTemp = 'Raro' : cd == 20 ? raridadeTemp = 'Muito Raro' :
    raridadeTemp = 'Lendário'
    
    setRaridade(raridadeTemp)
  }, [cd])

  useEffect(() => {
    if(copy) {
      setMensagem(
        'Nome: @\n' + 
        'Personagem: ' + personagem + '\n' +
        'Cria: ' + item + '\n' +
        'Raridade: ' + raridade + '\n' +
        'Ferramentas Utilizada: ' + tool + '\n' +
        'Custo de Fabricação: ' + total + '\n' +
        'Data de Início: ' + day + '/' + month + '/' + year + ' ' + hour + '\n' +
        'Data de Término: ' + finalDate.getDate() + '/' + (finalDate.getMonth() + 1) + '/' + finalDate.getFullYear() + ' ' + hour +'\n' +
        'Teste de Arcanismo: ' + '\n' +
        'Teste com ferramenta: '
      )

      setCopy(false)
    }
  }, [copy])

  useEffect(() => {
    copyText(mensagem)
  }, [mensagem])

  return (
    <div>
      <div className={styles.frame}>
        <h1>Calculadora do artesão</h1>
        <div className={styles.data_frame}>
          <div className={styles.input_frame}>
            <h3>Projeto</h3>
            <div className={styles.inputs}>
              <FormInput inputId='personagem' text='Personagem: ' type='text' defVal={''} eventHandler={changePersonagem} />
              <FormInput inputId='item' text='Item: ' type='text' defVal={''} eventHandler={changeItem} />
              <FormSelect content={tiers} text='Tier do Artesão: ' inputId='selectTier' eventHandler={changeVe} />
              <FormSelect content={raridades} text='Raridade do Item: ' inputId='rarity' eventHandler={changeCd} />
              <FormSelect inputId='ferramenta' text='Ferramentas Utilizadas: ' content={ferramentas} eventHandler={changeTool} />
              {upgrade ? (
                <div>
                  <FormInput inputId='priceAnterior' text='Valor do item base: ' type='number' min={0} max={100000} defVal={0} eventHandler={changePriceAnterior} />
                  <FormInput inputId='priceNovo' text='Valor do upgrade: ' type='number' min={0} max={100000} defVal={0} eventHandler={changePriceNovo} />
                </div>
              ) : (
                <FormInput inputId='price' text='Valor do Item: ' type='number' min={0} max={100000} defVal={0} eventHandler={changePrice} />
              )}
              <FormInput inputId='consumivel' text='Consumível? ' type='checkbox' defVal={2} eventHandler={toggleConsumivel} />
              <FormInput inputId='artifice10' text='Artífice Nv. 10? ' type='checkbox' defVal={true} eventHandler={toggleArtifice} />
              <FormInput inputId='upgrade' text='Upgrade? ' type='checkbox' defVal={true} eventHandler={toggleUpgrade} />
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
      <div className={styles.frame}>
        <h1>Template do post</h1>
        <div>
          <p>Nome: @</p>
          <p>Personagem: {personagem}</p>
          <p>Cria: {item}</p>
          <p>Raridade: {raridade}</p>
          <p>Ferramentas Utilizadas: {tool}</p>
          <p>Custo de Fabricação: {total}</p>
          <p>Data de Início: {`${day}/${month}/${year}`} {hour && (
            <span>{hour}</span>
          )}</p>
          <p>Data de Término: {finalDate && (
            <span>{`${finalDate.getDate()}/${finalDate.getMonth() + 1}/${finalDate.getFullYear()}`}</span>
          )} {hour && (
            <span>{hour}</span>
          )}</p>
          <p>Teste de Arcanismo: </p>
          <p>Teste com Ferramenta: </p>
          <button onClick={copyMessage} className={styles.button}>Copiar</button>
        </div>
      </div>
    </div>
  )
}