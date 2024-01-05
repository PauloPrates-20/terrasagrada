import Link from 'next/link'

import MenuImage from '@/components/MenuImage';

import styles from '@/styles/Home.module.css'

export default function Home() {
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
          <MenuImage path={'/images/potion.png'} />
          Consumíveis
        </Link>
        <Link href='/listas/itensmagicos'>
          <MenuImage path={'/images/magicitem.png'} />
          Itens Mágicos
        </Link>
        <Link href='/listas/montarias'>
          <MenuImage path={'/images/mount.jfif'} />
          Montarias
        </Link>
        <Link href='/ferramentas/calculadorahp'>
          <MenuImage path={'/images/hitdie.jfif'} />
          Calculadora de HP
        </Link>
        <Link href='/ferramentas/conjurador'>
          <MenuImage path={'/images/caster.jpg'} />
          Nível de Conjurador
        </Link>
        <Link href='/ferramentas/grimorio'>
          <MenuImage path={'/images/grimorio.jfif'} />
          Grimório do Mago
        </Link>
        <Link href='/ferramentas/crafting'>
          <MenuImage path={'/images/crafting.jpg'} />
          Calculadora do Artesão
        </Link>
      </div>
    </main>
  )
}
