import { FaDiscord } from 'react-icons/fa'

import styles from '@/styles/Footer.module.css'

import att from '@/public/attribution.json'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>
        O site oficial do servidor <span>Terra Sagrada</span> no
        <a target='_blank' href="https://discord.gg/nTqkZtZFGE">
          <span> Discord</span>
          <span className={styles.symbol}><FaDiscord /></span>
        </a>
      </h3>
      <div className={styles.minor}>
        <p>
          Rev 3.7 2024
        </p>
        <div className={styles.credits}>
          <p className={styles.minor}>
            Bakground Image <a target='_blank' href={att.images.background.url}>
              {att.images.background.author}
            </a> {att.images.background.site}
          </p>
        </div>
      </div>
    </footer>
  )
}