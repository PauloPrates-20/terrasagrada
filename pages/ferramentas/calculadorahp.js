import { useState, useEffect } from 'react'

import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

import styles from '@/styles/HpCalculator.module.css'
import MultiClasse from '@/components/MultiClasse'

function calcOut(dice, lvl, con, dragon, dwarf, feat, multDice, multLvl) {
  let out = 0
  let firstHp = (dice + con + dragon + dwarf + feat)
  let nextHp = ((dice / 2 + 1) + con + dragon + feat + dwarf)
  let multOneHp = 0
  if (multDice.one != 0) {
    multOneHp = ((multDice.one / 2) + 1 + con + dragon + dwarf + feat) * multLvl.one
  }
  let multTwoHp = 0
  if (multDice.two != 0) {
    multTwoHp = ((multDice.two / 2) + 1 + con + dragon + dwarf + feat) * multLvl.two
  }
  let multThreeHp = 0
  if (multDice.three != 0) {
    multThreeHp = ((multDice.three / 2) + 1 + con + dragon + dwarf + feat) * multLvl.three
  }
  if (lvl == 1 && multDice.one == 0) {
    out = firstHp
  }
  else {
    out = firstHp + (nextHp * (lvl - 1)) + multOneHp + multTwoHp + multThreeHp
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

  const [playerClass, setPlayerClass] = useState('artifice')
  const [multClass, setMultClass] = useState({ one: 'none', two: 'none', three: 'none' })
  const [multLvl, setMultLvl] = useState({ one: 1, two: 1, three: 1 })
  const [multDice, setMultDice] = useState({ one: 0, two: 0, three: 0 })
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
  const [sorcerer, setSorcerer] = useState(false)

  let results = []

  const changeClass = (value) => {
    setPlayerClass(value);
    setDice(dices[value])
  }
  const changeMultClass = (value, id) => {
    switch (id) {
      case 'multOne':
        if (value == 'none') {
          setMultClass({ one: value, two: value, three: value })
          setMultDice({ one: 0, two: 0, three: 0 })
        }
        else {
          setMultClass(state => ({ ...state, one: value }))
          setMultDice(state => ({ ...state, one: dices[value] }))
        }
        break;

      case 'multTwo':
        if (value == 'none') {
          setMultClass(state => ({ ...state, two: value, three: value }))
          setMultDice(state => ({ ...state, two: 0, three: 0 }))
        }
        else {
          setMultClass(state => ({ ...state, two: value }))
          setMultDice(state => ({ ...state, two: dices[value] }))
        }
        break;

      case 'multThree':
        if (value == 'none') {
          setMultClass(state => ({ ...state, three: value }))
          setMultDice(state => ({ ...state, three: 0 }))
        }
        else {
          setMultClass(state => ({ ...state, three: value }))
          setMultDice(state => ({ ...state, three: dices[value] }))
        }
        break;
    }
  }

  const changeMultLvl = (value, id) => {
    switch (id) {
      case 'multLvl1':
        setMultLvl(state => ({...state, one: value * 1}))
        break;
      
      case 'multLvl2':
        setMultLvl(state => ({...state, two: value * 1}))
        break;

      case 'multLvl3':
        setMultLvl(state => ({...state, three: value * 1}))
        break;
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
    results = calcOut(dice, lvl, conMod, dragon, dwarf, feat, multDice, multLvl)
    setOut(results[0])
    setFirst(results[1])
    setNext(results[2])
  }, [
    dice,
    lvl,
    con,
    dragon,
    dwarf,
    feat,
    multClass,
    multLvl
  ])

  useEffect (() => {
    if (multClass.one == 'feiticeiro' || multClass.two == 'feiticeiro' || multClass.three == 'feiticeiro' || playerClass == 'feiticeiro') {
      setSorcerer(true)
    }
    else {
      setSorcerer(false)
      setDragon(false)
    }
  }, [multClass, playerClass])

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
              <h3>Multiclasse</h3>
              <div className={styles.mult}>
                <div className={styles.stats}>
                  <MultiClasse content={playerClasses} text='Multiclasse #1: ' inputId='multOne' eventHandler={changeMultClass} />
                  <FormInput type='number' inputId='multLvl1' text='Nível: ' min={1} max={20} len={2} defVal={1} eventHandler={changeMultLvl} />
                </div>
                {multClass.one != 'none' && (
                  <div className={styles.stats}>
                    <MultiClasse content={playerClasses} text='Multiclasse #2: ' inputId='multTwo' eventHandler={changeMultClass} />
                    <FormInput type='number' inputId='multLvl2' text='Nível: ' min={1} max={20} len={2} defVal={1} eventHandler={changeMultLvl} />
                  </div>
                )}
                {multClass.two != 'none' && (
                  <div className={styles.stats}>
                    <MultiClasse content={playerClasses} text='Multiclasse #3: ' inputId='multThree' eventHandler={changeMultClass} />
                    <FormInput type='number' inputId='multLvl3' text='Nível: ' min={1} max={20} len={2} defVal={1} eventHandler={changeMultLvl} />
                  </div>
                )}
              </div>
              <div className={styles.const}>
                <p>Constituição</p>
                <p className={styles.modifier}>
                  {conMod}
                </p>
                <FormInput type='number' inputId='con' defVal={10} min={0} max={30} len={2} eventHandler={changeCon} />
              </div>
            </div>
          </div>
          <div className={styles.feats}>
            <h3>Características</h3>
            <FormInput type='checkbox' text='Anão da Colina? ' inputId='dwarf' eventHandler={toggleDwarf} defVal={1} />
            <FormInput type='checkbox' text='Talento Robusto? ' inputId='feat' eventHandler={toggleFeat} defVal={2} />
            {sorcerer && (
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