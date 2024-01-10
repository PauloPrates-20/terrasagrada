import styles from '@/styles/CasterSlots.module.css'

export default function CasterSlots({ slots }) {
  return (
    <div className={styles.slot_frame}>
      {slots.map((slot, index) => (
        <div className={styles.slot_card} key={index}>
          <p className={styles.card_header}>{slot.nivel}</p>
          <p className={styles.card_cont}>{slot.qtd}</p>
        </div>
      ))}
    </div>
  )
}