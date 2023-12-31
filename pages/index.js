import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'

export default function Home() {
  const imgWd = 1080;
  const imgHt = 1080;

  return (
    <main className={styles.page_container}>
      <div className={styles.main_container}>
        <h1>Bem Vindo à <span>Terra Sagrada!</span></h1>
        <p>
          Aqui você encontra o material de referência, assim como ferramentas úteis, para a sua jogatina
          nas mesas da Terra Sagrada!
        </p>
      </div>
      <div className={styles.list_container}>
        <Link href='/listas/consumiveis'>
          <Image
            src={'/images/potion.png'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Consumíveis
        </Link>
        <Link href='/listas/itensmagicos'>
          <Image
            src={'/images/magicitem.png'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Itens Mágicos
        </Link>
        <Link href='/listas/montarias'>
          <Image
            src={'/images/mount.jfif'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Montarias
        </Link>
        <Link href='/ferramentas/calculadorahp'>
        <Image
            src={'/images/hitdie.jfif'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Calculadora de HP
        </Link>
        <Link href='/ferramentas/conjurador'>
        <Image
            src={'/images/caster.jpg'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Nível de Conjurador
        </Link>
        <Link href='/ferramentas/grimorio'>
        <Image
            src={'/images/grimorio.jfif'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Transcrição de Magias
        </Link>
        <Link href='/ferramentas/crafting'>
        <Image
            src={'/images/crafting.jpg'}
            width={imgWd}
            height={imgHt}
            alt=''
          />
          Criação de Itens
        </Link>
      </div>
    </main>
  )
}
