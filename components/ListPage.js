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

const tierNecessario = {
  comum: 'Iniciante',
  incomum: 'Cobre',
  raro: 'Prata',
  muRaro: 'Ouro',
  lendario: 'Platina'
}

const nivelNecessario = {
  comum: '',
  incomum: '2',
  raro: '6',
  muRaro: '10',
  lendario: '14'
}

const itemTypes = {
  potion: 'Consumível',
  magic: 'Item Mágico',
  horse: 'Montaria',
  artifice: 'Infusão de Artifice'
}

export default function ListPage({ data, title, type, propNome }) {
  let tabelaDeRequisitos = tierNecessario

  if (type == 'artifice') {
    tabelaDeRequisitos = nivelNecessario
  }

  const primeiroItem = data[0].docData[0]

  const [details, setDetails] = useState({
    item: primeiroItem.nome,
    value: primeiroItem.value,
    tipo: itemTypes[type],
    reforja: primeiroItem.reforge,
    sintoniza: primeiroItem.sint,
    link: primeiroItem.url,
    raridade: tierList[primeiroItem.tier],
    requisito: tabelaDeRequisitos[primeiroItem.tier],
    obs: primeiroItem.obs
  })

  const changeItemDetails = (object) => {
    setDetails({
      item: object.nome,
      value: object.valor,
      tipo: itemTypes[type],
      reforja: object.reforge,
      sintoniza: object.sint,
      link: object.url,
      raridade: tierList[object.tier],
      requisito: tabelaDeRequisitos[object.tier],
      obs: object.obs
    })
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.half_screen}>
        <h1>{title}</h1>
        <div className={styles.list_container}>
          {data.map((content) => (
            <ContentList key={content.id} content={content.docData} tier={content.tier} type={type} clickHandler={changeItemDetails} />
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
        <div className={styles.third_block}>
          {type == 'artifice' ? (
            <>
              <p>Nível de Artífice Necessário: {details.requisito}</p>
            </>
          ) : (
            <>
              <p>Tier Necessário: {details.requisito}</p>
            </>
          )}
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
          {details.obs && (
            <>
              <p>*{details.obs}</p>
            </>
          )}
        </div>
        <a target='_blank' href={details.link}>Detalhes</a>
      </div>
    </div>
  )
}