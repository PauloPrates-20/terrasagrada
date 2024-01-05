import { GiBookCover, GiCauldron, GiGems, GiHearts, GiHorseHead, GiHamburgerMenu, GiSwordSmithing, GiSparkles, GiGearHammer } from 'react-icons/gi'

import Link from 'next/link'
import { useState } from 'react'

import ListCard from '@/components/ListCard';

import styles from '@/styles/Home.module.css'
import Listas from '@/components/Listas';
import Ferramentas from '@/components/Ferramentas';

export default function Home() {
  const [content, setContent] = useState('none')
  const [oldContent, setOldContent] = useState(content)

  let newContent = ''

  const handleClick = (text) => {
    setOldContent(content)
    newContent = text
    if (newContent === content) {
      setContent('none')
    }
    else {
      if (content === 'none') {
        setContent(text)
      }
      else {
        setContent('none')
        setTimeout(() => {
          setContent(text)
        }, 700)
      }
    }
  }

  const gimmickClick = () => {
    return
  }

  return (
    <main className={styles.page_container}>
      <div className={styles.main_container}>
        <h1>Bem Vindo à <span>Terra Sagrada!</span></h1>
        <p>
          Aqui você encontra o material de referência, assim como ferramentas úteis, para a sua jogatina
          nas mesas da Terra Sagrada!
        </p>
      </div>
      <div className={styles.spacer}>
        <div className={styles.list_container}>
          <ListCard icon={<GiHamburgerMenu />} text='Listas' clickHandler={handleClick} />
          <ListCard icon={<GiGearHammer />} text='Ferramentas' clickHandler={handleClick} />
        </div>
        <div className={`${styles.link_container} ${styles[content]}`}>
          <div className={`${styles.link_content}`}>
            {content == 'none' ? oldContent == 'Listas' ? (
              <Listas clickHandler={gimmickClick} />
            ) : oldContent == 'Ferramentas' ? (
              <Ferramentas clickHandler={gimmickClick} />
            ) : (
              <></>
            ) : content == 'Listas' ? (
              <Listas clickHandler={gimmickClick} />
            ) : (
              <Ferramentas clickHandler={gimmickClick} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
