import { useState, useEffect } from 'react'

import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

import styles from '@/styles/HpCalculator.module.css'

function calcOut(dice, lvl, con, dragon, dwarf, feat) {
  let out = 0
  let firstHp = (dice + con + dragon + dwarf + feat)
  let nextHp = ((dice / 2 + 1) + con + dragon + feat + dwarf)
  if (lvl == 1) {
    out = firstHp
  }
  else {
    out = firstHp + (nextHp * (lvl - 1))
  }

  return [out, firstHp, nextHp]
}

export default function HpCalculator() {
  const playerClasses = [
    { value: 'artifice', nome: 'Artífice' },
    { value: 'barbaro', nome: 'Bárbaro' },
    { value: 'bardo', nome: 'Bardo' },
    { value: 'bruxo', nome: 'Bruxo' },
    { value: 'clerigo', nome: 'Clérigo' },
    { value: 'druida', nome: 'Druida' },
    { value: 'feiticeiro', nome: 'Feiticeiro' },
    { value: 'guerreiro', nome: 'Guerreiro' },
    { value: 'ladino', nome: 'Ladino' },
    { value: 'mago', nome: 'Mago' },
    { value: 'monge', nome: 'Monge' },
    { value: 'paladino', nome: 'Paladino' },
    { value: 'patrulheiro', nome: 'Patrulheiro' },
  ]

  const dices = {
    artifice: 8,
    barbaro: 12,
    bardo: 8,
    bruxo: 8,
    clerigo: 8,
    druida: 8,
    feiticeiro: 6,
    guerreiro: 10,
    ladino: 8,
    mago: 6,
    monde: 8,
    paladino: 10,
    patrulheiro: 10
  }

  const [playerClass, setPlayerClass] = useState('Artifice')
  const [dice, setDice] = useState(8)
  const [lvl, setLvl] = useState(1)
  const [con, setCon] = useState(10)
  const [conMod, setConMod] = useState(Math.floor((con - 10) / 2))
  const [dragon, setDragon] = useState(0)
  const [dwarf, setDwarf] = useState(0)
  const [feat, setFeat] = useState(0)
  const [out, setOut] = useState(0)
  const [first, setFirst] = useState(0)
  const [next, setNext] = useState(0)

  let results = []

  const changeClass = (value) => {
    setPlayerClass(value);
    setDice(dices[value])
    if (value != 'feiticeiro') {
      toggleDragon(0)
    }
  }
  const changeLvl = (value) => {
    setLvl(value * 1)
  }
  const changeCon = (value) => {
    setCon(value * 1)
    setConMod(Math.floor((value * 1 - 10) / 2))
  }
  const toggleDragon = (value) => {
    setDragon(value * 1)
  }
  const toggleDwarf = (value) => {
    setDwarf(value * 1)
  }
  const toggleFeat = (value) => {
    setFeat(value * 1)
  }

  useEffect(() => {
    results = calcOut(dice, lvl, conMod, dragon, dwarf, feat)
    setOut(results[0])
    setFirst(results[1])
    setNext(results[2])
  }, [
    dice,
    lvl,
    con,
    dragon,
    dwarf,
    feat
  ])

  return (
    <div className={styles.page_frame}>
      <h1>Calculadora de HP</h1>
      <div className={styles.calculator_frame}>
        <div className={styles.player_info}>
          <div className={styles.stats_frame}>
            <h3>Atributos</h3>
            <div className={styles.stats_layer}>
              <div className={styles.stats}>
                <FormSelect content={playerClasses} text='Classe: ' inputId='PlayerClass' eventHandler={changeClass} />
                <FormInput type='number' inputId='lvl' text='Nível: ' min={1} max={20} len={2} defVal={1} eventHandler={changeLvl} />
              </div>
              <div className={styles.const}>
                <p>Constituição</p>
                <p className={styles.modifier}>
                  {conMod}
                </p>
                <FormInput className={styles.con_value} type='number' inputId='con' defVal={10} min={0} max={30} len={2} eventHandler={changeCon} />
              </div>
            </div>
          </div>
          <div className={styles.feats}>
            <h3>Características</h3>
            <FormInput type='checkbox' text='Anão da Colina? ' inputId='dwarf' eventHandler={toggleDwarf} defVal={1} />
            <FormInput type='checkbox' text='Talento Robusto? ' inputId='feat' eventHandler={toggleFeat} defVal={2} />
            {playerClass == 'feiticeiro' && (
              <FormInput type='checkbox' text='Feiticeiro Dracônico? ' inputId='dragon' eventHandler={toggleDragon} defVal={1} />
            )}
          </div>
        </div>
        <div className={styles.output}>
          <h3>HP Total: <span>{out}</span></h3>
          <p>Dado de vida: <span>1d{dice}</span></p>
          <p>HP no 1º Nível: <span>{first}</span></p>
          <p>HP nos níveis seguintes: <span>{next}</span></p>
        </div>
      </div>
    </div>
  )
}