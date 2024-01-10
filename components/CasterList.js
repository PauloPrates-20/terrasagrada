import styles from '@/styles/CasterList.module.css'

export default function CasterList({ content, eventHandler }) {
  const handleChange = (e) => {
    eventHandler(e.target.id, e.target.value * 1)
  }

  return (
    <>
      {content.map((classe, index) => (
        <div className={styles.frame} key={index}>
          <div className={styles.label}>
            <label htmlFor={classe.value}>{classe.nome}</label>
          </div>
          <div className={styles.input}>
            <input onChange={handleChange} id={classe.value} name={classe.value} type='number' defaultValue={0} min={0} max={20} size={2}></input>
          </div>
        </div>
      ))}
    </>
  )
}