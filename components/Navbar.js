import { useState } from "react";

import Image from 'next/image'

import { FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa'

import styles from '@/styles/Navbar.module.css'

export default function Navbar() {
  const toggle = ['checked', 'unchecked']

  const [mainToggle, setmainToggle] = useState(toggle[1])
  const [listToggle, setlistToggle] = useState(toggle[1])
  const [toolToggle, settoolToggle] = useState(toggle[1])

  const navClick = () => {
    if (mainToggle == toggle[0]) {
      setmainToggle(toggle[1])
    }
    else {
      setmainToggle(toggle[0])
    }
  }

  const listClick = () => {
    if (listToggle == toggle[0]) {
      setlistToggle(toggle[1])
    }
    else {
      setlistToggle(toggle[0])
    }
  }

  const toolClick = () => {
    if (toolToggle == toggle[0]) {
      settoolToggle(toggle[1])
    }
    else {
      settoolToggle(toggle[0])
    }
  }

  return (
    <header className={styles.main_header}>
      <nav className={styles.navbar}>
        <FaBars onClick={navClick} className={styles.drop_toggle} id={styles.exclude} />
        <div className={`${styles.dropdown} ${styles[mainToggle]}`}>
          <a href='/'>Home</a>
          <div onClick={listClick} className={styles.drop_toggle}>
            {listToggle == toggle[1] ? <FaAngleDown /> : <FaAngleUp />}
            <span>Listas</span>
          </div>
          <div className={`${styles.dropdown_2} ${styles[listToggle]}`}>
            <a href='/listas/consumiveis'>Consumíveis</a>
            <a href='/listas/itensmagicos'>Itens Mágicos</a>
            <a href='/listas/mundanos'>Itens Mundanos</a>
            <a href='/listas/artifice'>Infusões de Artífice</a>
          </div>
          <div onClick={toolClick} className={styles.drop_toggle}>
            {toolToggle == toggle[1] ? <FaAngleDown /> : <FaAngleUp />}
            <span>Ferramentas</span>
          </div>
          <div className={`${styles.dropdown_2} ${styles[toolToggle]}`}>
            <a href='/ferramentas/calculadorahp'>Calculadora de HP</a>
            <a href='/ferramentas/conjurador'>Nível de Conjurador</a>
            <a href='/ferramentas/crafting'>Calculadora do Artesão</a>
            <a href='/ferramentas/grimorio'>Grimório do Mago</a>
          </div>
        </div>
      </nav>
      <div className={styles.logo}>
        <a href='/'>
          <p>Terra Sagrada</p>
          <Image
            src={'/images/d20.png'}
            width={30}
            height={30}
            alt=''
          />
        </a>
      </div>
    </header>
  )
}