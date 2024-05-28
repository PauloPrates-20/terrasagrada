import { useState } from 'react'

import ContentList from './ContentList'
import SearchBar from './SearchBar';

import styles from '@/styles/ListPage.module.css'

function normalizarTexto(texto) {
  if (typeof texto !== 'string') {
    return '';
  }
  let textoNormal = texto.normalize("NFD");
  textoNormal = textoNormal.replace(" ", "_");
  textoNormal = textoNormal.toLowerCase();
  textoNormal = textoNormal.replace(/[\u0300-\u036f\.,\-\/#!$%\^&\*\(\)\{\}]/g, "");

  return textoNormal;
}

function capitalizarTexto(texto) {
  if (typeof texto === 'string') {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
  
  return '';
}

function organizarTipo(tipos) {
  const tiposOrganizados = [];

  if (Array.isArray(tipos)) {
    tipos.forEach(tipo => {
      if (tipo == 'arma' || tipo == 'armadura' || tipo == 'escudo') {
        tiposOrganizados[0] = tipo;
      } else if (tipo == 'simples' || tipo == 'marcial' || tipo == 'leve' || tipo == 'média' || tipo == 'pesada') {
        tiposOrganizados[1] = tipo;
      } else if (tipo == 'corpo-a-corpo' || tipo == 'distância') {
        tiposOrganizados[3] = tipo;
      }
    });
  }
  
  return tiposOrganizados;
}

const tierNecessario = {
  comum: 'Iniciante',
  incomum: 'Cobre',
  raro: 'Prata',
  muito_raro: 'Ouro',
  lendario: 'Platina'
}

const nivelRaridade = {
  2: "Incomum",
  6: "Raro",
  10: "Muito Raro",
  14: "Lendário"
}

const itemTypes = {
  consumiveis: 'Consumível',
  itensMagicos: 'Item Mágico',
  infusoes: 'Infusão de Artifice',
  itensMundanos: 'Itens Mundanos'
}

export default function ListPage({ data, title, type }) {
  const primeiroItem = data[0].docData[0]

  const [infoLista, setInfoLista] = useState(data);

  let tier = '';
  if (primeiroItem.raridade) {
    tier = tierNecessario[normalizarTexto(primeiroItem.raridade)];
  } 

  let nome = primeiroItem.nome;
  if (type !== 'consumiveis' && type !== 'itensMundanos') {
    nome = primeiroItem.nome.portugues
  }

  let raridade = 'Comum';
  if (primeiroItem.raridade) {
    raridade = primeiroItem.raridade
  }
  if (type === 'infusoes') {
    raridade = nivelRaridade[primeiroItem.nivel];
  }

  const [details, setDetails] = useState(
    {
    item: nome,
    valor: primeiroItem.valor,
    tipo: itemTypes[type],
    reforja: primeiroItem.reqReforja,
    sintoniza: primeiroItem.reqSintonizacao,
    url: primeiroItem.url,
    raridade: raridade,
    tier: tier,
    nivel: primeiroItem.nivel,
    obs: primeiroItem.obs,
    tipoMundano: organizarTipo(primeiroItem.tipo),
    dano: primeiroItem.dano,
    propriedades: primeiroItem.propriedades,
    peso: primeiroItem.peso,
    forca: primeiroItem.forca,
    ca: primeiroItem.ca,
    furtividade: primeiroItem.furtividade
    })

  const changeItemDetails = (item) => {
    nome = item.nome;
    if (type !== 'consumiveis' && type !== 'itensMundanos') {
      nome = item.nome.portugues;
    }

    tier = tierNecessario[normalizarTexto(item.raridade)]

    raridade = item.raridade;
    if (type === 'infusoes') {
      raridade = nivelRaridade[item.nivel];
    }

    setDetails({
      item: nome,
      valor: item.valor,
      tipo: itemTypes[type],
      reforja: item.reqReforja,
      sintoniza: item.reqSintonizacao,
      url: item.url,
      raridade: raridade,
      tier: tier,
      nivel: item.nivel,
      obs: item.obs,
      tipoMundano: organizarTipo(item.tipo),
      dano: item.dano,
      propriedades: item.propriedades,
      peso: item.peso,
      forca: item.forca,
      ca: item.ca,
      furtividade: item.furtividade
    })
  }

  const filtrarItens = (pesquisa) => {
    let itensFiltrados = []

    if (primeiroItem.nome.portugues) {
      itensFiltrados = data.map(dataSet => {
        return {
          ...dataSet,
          docData: dataSet.docData.filter(item => 
            item.nome.portugues.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.nome.original.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.valor.toString().includes(pesquisa)
          )
        }
      });
    } else {
      itensFiltrados = data.map(dataSet => {
        return {
          ...dataSet,
          docData: dataSet.docData.filter(item => 
            item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.valor.toString().includes(pesquisa)
        )}
      });
    }

    setInfoLista(itensFiltrados);
  }

  return (
    <div className={styles.global_container}>
      <SearchBar eventHandler={filtrarItens} />
      <div className={styles.main_container}>
      <div className={styles.half_screen}>
        <h1>{title}</h1>
        <div className={styles.list_container}>
          {infoLista.map((content) => (
            <ContentList key={content.id} content={content.docData} raridade={normalizarTexto(content.raridade)} type={type} tipoItem={content.tipo} clickHandler={changeItemDetails} />
          ))}
        </div>
      </div>
      <div className={styles.detail}>
        <h1>{details.item}</h1>
        <div className={styles.first_block}>
          <div className={styles.sub_block}>
          {type !== 'itensMundanos' ? (
            <>
              <p>{details.tipo}</p>
              <p>{details.raridade}</p>
            </>
          ) : details.tipoMundano.map((tipo, index) => (
            <p key={index}>{capitalizarTexto(tipo)}</p>
          ))}
            
          </div>
          <p className={styles.gold}>{details.valor} PO</p>
        </div>
        <div className={styles.third_block}>
          {type == 'infusoes' ? (
            <>
              <p>Nível de Artífice Necessário: {details.nivel}</p>
            </>
          ) : type == 'itensMundanos' ? (
            <>
              <h3>Detalhes</h3>
              <p>Peso: {details.peso.toUpperCase()}</p>
              {details.dano && (
                <>
                  {details.dano.dado && (
                    <p>Dano: <span>{details.dano.dado}</span> <span>{capitalizarTexto(details.dano.tipo)}</span></p>
                  )}
                </>
              )}
              {details.forca && (
                <p>Força Necessária: {details.forca}</p>
              )}
              {details.ca && (
                <p>CA: {details.ca}</p>
              )}
              {details.furtividade && (
                <p>Furtividade: Desvantagem</p>
              )}
              {details.propriedades && (
                <>
                {details.propriedades[0] !== '' && (
                  <>
                  <h3>Propriedades</h3>
                  {details.propriedades.map((prop, index) => (
                    <p key={index}>{capitalizarTexto(prop)}</p>
                  ))}
                  </>
                )}
                </>
               )}
            </>
          ) : (
            <>
              <p>Tier Necessário: {details.tier}</p>
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
        <a target='_blank' href={details.url}>Detalhes</a>
      </div>
    </div>
    </div>
  );
}