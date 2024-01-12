import { useEffect, useState } from 'react'

import styles from '@/styles/Spell.module.css'

export default function Spell({ spellId, lvlId, schoolId, schools, mage, sendData }) {
  const [details, setDetails] = useState({ school: 'none', price: 0, nivel: 1, time: 0 })
  const [price, setPrice] = useState(0)
  const [time, setTime] = useState(0)

  const handleChange = (e) => {
    switch (e.target.id) {
      case lvlId:
        setDetails(details => ({ ...details, nivel: e.target.value }))
        break;
      case schoolId:
        setDetails(details => ({ ...details, school: e.target.value }))
    }
  }

  useEffect(() => {
    if (details.school != 'none') {
      setDetails(details => ({ ...details, price: 50 * details.nivel, time: 2 * details.nivel }))
      if (mage == details.school) {
        setPrice(50 * details.nivel / 2)
        setTime(2 * details.nivel / 2)
      }
      else {
        setPrice(50 * details.nivel)
        setTime(2 * details.nivel)
      }
    }
    else {
      setDetails(details => ({ ...details, price: 0, time: 0 }))
      setPrice(0)
      setTime(0)
    }
  }, [details.nivel, details.school, mage])

  useEffect(() => {
    sendData(spellId - 1, details)
  }, [details])

  return (
    <div className={styles.frame}>
      <div className={styles.spell_number}>
        <p>#{spellId}</p>
      </div>
      <div className={styles.data_frame}>
        <div className={styles.inputs}>
          <div className={styles.spell_level}>
            <div className={styles.label}>
              <label htmlFor={lvlId}>Nível: </label>
            </div>
            <select onChange={handleChange} id={lvlId} name={lvlId}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </select>
          </div>
          <div className={styles.spell_school}>
            <div className={styles.label}>
              <label htmlFor={schoolId}>Escola: </label>
            </div>
            <select onChange={handleChange} id={schoolId} name={schoolId}>
              {schools.map((school, index) => (
                <option key={index} value={school.value}>{school.nome}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.output_frame}>
          <div className={styles.output}>
            <p>Custo: </p>
            <p className={styles.detail}>{price} PO</p>
          </div>
          <div className={styles.output}>
            <p>Tempo: </p>
            <p className={styles.detail}>
              {time} {time == 1 ? 'Hora' : 'Horas'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}