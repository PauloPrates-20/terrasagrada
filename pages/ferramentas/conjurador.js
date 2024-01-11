import { useEffect, useState } from 'react'

import styles from '@/styles/Conjurador.module.css'
import CasterSlots from '@/components/CasterSlots'
import CasterList from '@/components/CasterList'

const slots = [
  { nivel: '1st', qtd: 0 },
  { nivel: '2nd', qtd: 0 },
  { nivel: '3rd', qtd: 0 },
  { nivel: '4th', qtd: 0 },
  { nivel: '5th', qtd: 0 },
  { nivel: '6th', qtd: 0 },
  { nivel: '7th', qtd: 0 },
  { nivel: '8th', qtd: 0 },
  { nivel: '9th', qtd: 0 }
]

const warlockSlots = [
  { nivel: '1st', qtd: 0 },
  { nivel: '2nd', qtd: 0 },
  { nivel: '3rd', qtd: 0 },
  { nivel: '4th', qtd: 0 },
  { nivel: '5th', qtd: 0 }
]

const casterClasses = [
  { value: 'artifice', nome: 'Artífice', tipo: 'half' },
  { value: 'bardo', nome: 'Bardo', tipo: 'full' },
  { value: 'clerigo', nome: 'Clérigo', tipo: 'full' },
  { value: 'druida', nome: 'Druida', tipo: 'full' },
  { value: 'feiticeiro', nome: 'Feiticeiro', tipo: 'full' },
  { value: 'mago', nome: 'Mago', tipo: 'full' },
  { value: 'paladino', nome: 'Paladino', tipo: 'half' },
  { value: 'patrulheiro', nome: 'Patrulheiro', tipo: 'half' },
  { value: 'cavMist', nome: 'Cavaleiro Místico', tipo: 'sub' },
  { value: 'trapArc', nome: 'Trapaceiro Arcano', tipo: 'sub' },
  { value: 'bruxo', nome: 'Bruxo', tipo: 'short' }
]

const casterProperty = {
  artifice: { tipo: 'half', nivel: 0 },
  bardo: { tipo: 'full', nivel: 0 },
  clerigo: { tipo: 'full', nivel: 0 },
  druida: { tipo: 'full', nivel: 0 },
  feiticeiro: { tipo: 'full', nivel: 0 },
  mago: { tipo: 'full', nivel: 0 },
  paladino: { tipo: 'half', nivel: 0 },
  patrulheiro: { tipo: 'half', nivel: 0 },
  cavMist: { tipo: 'sub', nivel: 0 },
  trapArc: { tipo: 'sub', nivel: 0 },
  bruxo: { tipo: 'short', nivel: 0 }
}

const subTable = [
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 }
]

const halfTable = [
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 2, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 2, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 1, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 1, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 0, setimo: 0, oitavo: 0, nono: 0 }
]

const artificeTable = [
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 2, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 2, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 1, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 1, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 0, setimo: 0, oitavo: 0, nono: 0 }
]

const warlockTable = [
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0 },
  { primeiro: 1, segundo: 0, terceiro: 0, quarto: 0, quinto: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0 },
  { primeiro: 0, segundo: 2, terceiro: 0, quarto: 0, quinto: 0 },
  { primeiro: 0, segundo: 2, terceiro: 0, quarto: 0, quinto: 0 },
  { primeiro: 0, segundo: 0, terceiro: 2, quarto: 0, quinto: 0 },
  { primeiro: 0, segundo: 0, terceiro: 2, quarto: 0, quinto: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 2, quinto: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 2, quinto: 0 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 2 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 2 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 2 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 3 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 3 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 3 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 3 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 3 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 4 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 4 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 4 },
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 4 }
]

const fullTable = [
  { primeiro: 0, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 2, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 3, segundo: 0, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 2, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 0, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 2, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 0, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 1, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 2, quinto: 0, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 1, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 0, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 0, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 1, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 1, oitavo: 0, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 1, oitavo: 1, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 1, oitavo: 1, nono: 0 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 2, sexto: 1, setimo: 1, oitavo: 1, nono: 1 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 3, sexto: 1, setimo: 1, oitavo: 1, nono: 1 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 3, sexto: 2, setimo: 1, oitavo: 1, nono: 1 },
  { primeiro: 4, segundo: 3, terceiro: 3, quarto: 3, quinto: 3, sexto: 2, setimo: 2, oitavo: 1, nono: 1 }
]

function getLevel(levels) {
  let level = 0
  let casterLevel = 0
  let warlock = 0
  for (const property in levels) {
    switch (levels[property].tipo) {
      case 'half':
        casterLevel += Math.floor(levels[property].nivel / 2)
        level += levels[property].nivel
        break;
      case 'sub':
        casterLevel += Math.floor(levels[property].nivel / 3)
        level += levels[property].nivel
        break;
      case 'full':
        casterLevel += levels[property].nivel
        level += levels[property].nivel
        break;
      case 'short':
        warlock = levels[property].nivel
    }
  }

  casterLevel = Math.min(20, casterLevel)

  return [level, casterLevel, warlock]
}

export default function Caster() {
  const [classLvl, setClassLvl] = useState(casterProperty)
  const [casterLvl, setCasterLvl] = useState(0)
  const [totalLevel, setTotalLevel] = useState(0)
  const [warlock, setWarlock] = useState(0)
  const [spells, setSpells] = useState(slots)
  const [warlockSpells, setWarlockSpells] = useState(warlockSlots)
  const [table, setTable] = useState(fullTable)

  const changeClassLvl = (value, lvl) => {
    setClassLvl(state => ({ ...state, [value]: { tipo: classLvl[value].tipo, nivel: lvl } }))
  }

  useEffect(() => {
    let levels = (getLevel(classLvl))
    setCasterLvl(levels[1])
    setWarlock(levels[2])
    setTotalLevel(levels[0])
  }, [classLvl])

  useEffect(() => {
    setWarlockSpells([
      { nivel: '1st', qtd: warlockTable[warlock].primeiro },
      { nivel: '2nd', qtd: warlockTable[warlock].segundo },
      { nivel: '3rd', qtd: warlockTable[warlock].terceiro },
      { nivel: '4th', qtd: warlockTable[warlock].quarto },
      { nivel: '5th', qtd: warlockTable[warlock].quinto }
    ])

    setTable(fullTable)

    if (totalLevel > 0) {
      if (classLvl.artifice.nivel == totalLevel) {
        setTable(artificeTable)
      }
      else if (classLvl.paladino.nivel == totalLevel) {
        setTable(halfTable)
      }
      else if (classLvl.patrulheiro.nivel == totalLevel) {
        setTable(halfTable)
      }
      else if (classLvl.cavMist.nivel == totalLevel) {
        setTable(subTable)
      }
      else if (classLvl.trapArc.nivel == totalLevel) {
        setTable(subTable)
      }
    }
  }, [totalLevel, warlock])

  useEffect(() => {
    setSpells([
      { nivel: '1st', qtd: table[casterLvl].primeiro },
      { nivel: '2nd', qtd: table[casterLvl].segundo },
      { nivel: '3rd', qtd: table[casterLvl].terceiro },
      { nivel: '4th', qtd: table[casterLvl].quarto },
      { nivel: '5th', qtd: table[casterLvl].quinto },
      { nivel: '6th', qtd: table[casterLvl].sexto },
      { nivel: '7th', qtd: table[casterLvl].setimo },
      { nivel: '8th', qtd: table[casterLvl].oitavo },
      { nivel: '9th', qtd: table[casterLvl].nono }
    ])

    if (classLvl.artifice.nivel == totalLevel) {
      setSpells([
        { nivel: '1st', qtd: table[classLvl.artifice.nivel].primeiro },
        { nivel: '2nd', qtd: table[classLvl.artifice.nivel].segundo },
        { nivel: '3rd', qtd: table[classLvl.artifice.nivel].terceiro },
        { nivel: '4th', qtd: table[classLvl.artifice.nivel].quarto },
        { nivel: '5th', qtd: table[classLvl.artifice.nivel].quinto },
        { nivel: '6th', qtd: table[classLvl.artifice.nivel].sexto },
        { nivel: '7th', qtd: table[classLvl.artifice.nivel].setimo },
        { nivel: '8th', qtd: table[classLvl.artifice.nivel].oitavo },
        { nivel: '9th', qtd: table[classLvl.artifice.nivel].nono }
      ])
    }
    else if (classLvl.paladino.nivel == totalLevel) {
      setSpells([
        { nivel: '1st', qtd: table[classLvl.paladino.nivel].primeiro },
        { nivel: '2nd', qtd: table[classLvl.paladino.nivel].segundo },
        { nivel: '3rd', qtd: table[classLvl.paladino.nivel].terceiro },
        { nivel: '4th', qtd: table[classLvl.paladino.nivel].quarto },
        { nivel: '5th', qtd: table[classLvl.paladino.nivel].quinto },
        { nivel: '6th', qtd: table[classLvl.paladino.nivel].sexto },
        { nivel: '7th', qtd: table[classLvl.paladino.nivel].setimo },
        { nivel: '8th', qtd: table[classLvl.paladino.nivel].oitavo },
        { nivel: '9th', qtd: table[classLvl.paladino.nivel].nono }
      ])
    }
    else if (classLvl.patrulheiro.nivel == totalLevel) {
      setSpells([
        { nivel: '1st', qtd: table[classLvl.patrulheiro.nivel].primeiro },
        { nivel: '2nd', qtd: table[classLvl.patrulheiro.nivel].segundo },
        { nivel: '3rd', qtd: table[classLvl.patrulheiro.nivel].terceiro },
        { nivel: '4th', qtd: table[classLvl.patrulheiro.nivel].quarto },
        { nivel: '5th', qtd: table[classLvl.patrulheiro.nivel].quinto },
        { nivel: '6th', qtd: table[classLvl.patrulheiro.nivel].sexto },
        { nivel: '7th', qtd: table[classLvl.patrulheiro.nivel].setimo },
        { nivel: '8th', qtd: table[classLvl.patrulheiro.nivel].oitavo },
        { nivel: '9th', qtd: table[classLvl.patrulheiro.nivel].nono }
      ])
    }
    else if (classLvl.cavMist.nivel == totalLevel) {
      setSpells([
        { nivel: '1st', qtd: table[classLvl.cavMist.nivel].primeiro },
        { nivel: '2nd', qtd: table[classLvl.cavMist.nivel].segundo },
        { nivel: '3rd', qtd: table[classLvl.cavMist.nivel].terceiro },
        { nivel: '4th', qtd: table[classLvl.cavMist.nivel].quarto },
        { nivel: '5th', qtd: table[classLvl.cavMist.nivel].quinto },
        { nivel: '6th', qtd: table[classLvl.cavMist.nivel].sexto },
        { nivel: '7th', qtd: table[classLvl.cavMist.nivel].setimo },
        { nivel: '8th', qtd: table[classLvl.cavMist.nivel].oitavo },
        { nivel: '9th', qtd: table[classLvl.cavMist.nivel].nono }
      ])
    }
    else if (classLvl.trapArc.nivel == totalLevel) {
      setSpells([
        { nivel: '1st', qtd: table[classLvl.trapArc.nivel].primeiro },
        { nivel: '2nd', qtd: table[classLvl.trapArc.nivel].segundo },
        { nivel: '3rd', qtd: table[classLvl.trapArc.nivel].terceiro },
        { nivel: '4th', qtd: table[classLvl.trapArc.nivel].quarto },
        { nivel: '5th', qtd: table[classLvl.trapArc.nivel].quinto },
        { nivel: '6th', qtd: table[classLvl.trapArc.nivel].sexto },
        { nivel: '7th', qtd: table[classLvl.trapArc.nivel].setimo },
        { nivel: '8th', qtd: table[classLvl.trapArc.nivel].oitavo },
        { nivel: '9th', qtd: table[classLvl.trapArc.nivel].nono }
      ])
    }
  }, [table, totalLevel])

  return (
    <div className={styles.frame}>
      <div className={styles.caster_level}>
        <h2>Nível de Conjurador</h2>
        <CasterList content={casterClasses} eventHandler={changeClassLvl} />
      </div>
      <div className={styles.caster_slots}>
        <div>
          <h2>Espaços de Magia</h2>
          <CasterSlots slots={spells} />
          {warlock > 0 && (
            <p className={styles.desc}>Recuperados com descanso longo</p>
          )}
        </div>
        {warlock > 0 && (
          <div>
            <h2>Espaços de Magia de Pacto</h2>
            <CasterSlots slots={warlockSpells} />
            <p className={styles.desc}>Recuperados com descanso curto</p>
          </div>
        )}
      </div>
    </div>
  )
}