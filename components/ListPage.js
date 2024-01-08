import { useState } from 'react'

import ContentList from './ContentList'

import styles from '@/styles/ListPage.module.css'

const tierList = {
  teste: 'Comum',
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  muRaro: 'Muito Raro',
  lendario: 'Lendário'
}

const itemTypes = {
  potion: 'Consumível',
  magic: 'Item Mágico',
  horse: 'Montaria'
}

export default function ListPage({ data, title, type }) {
  const fstItem = data[0].docData[0]

  const [details, setDetails] = useState({
    item: fstItem.item,
    value: fstItem.value,
    tipo: itemTypes[type],
    reforja: fstItem.reforge,
    sintoniza: fstItem.sint,
    link: fstItem.url,
    raridade: tierList[fstItem.tier]
  })

  const itemDetails = (object) => {
    setDetails({
      item: object.item,
      value: object.value,
      tipo: itemTypes[type],
      reforja: object.reforge,
      sintoniza: object.sint,
      link: object.url,
      raridade: tierList[object.tier]
    })
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.half_screen}>
        <h1>{title}</h1>
        <div className={styles.list_container}>
          {data.map((content) => (
            <ContentList key={content.id} content={content.docData} tier={content.tier} type={type} clickHandler={itemDetails} />
          ))}
        </div>
      </div>
      <div className={styles.detail}>
        <h1>{details.item}</h1>
        <div className={styles.first_block}>
          <div className={styles.sub_block}>
            <p>{details.tipo}</p>
            <p>{details.raridade}</p>
          </div>
          <p className={styles.gold}>{details.value}</p>
        </div>
        <div className={styles.second_block}>
          {details.reforja && (
            <>
              <p>Reforja</p>
              <p className={styles.spacer}>{details.reforja}</p>
            </>
          )}
          {details.sintoniza && (
            <>
              <p>Sintonização</p>
              <p className={styles.spacer}>{details.sintoniza}</p>
            </>
          )}
        </div>
        <a target='_blank' href={details.link}>Detalhes</a>
      </div>
    </div>
  )
}