import styles from '@/styles/SearchBar.module.css'

export default function SearchBar({ eventHandler }) {
    const handleChange = (e) => {
        eventHandler(e.target.value);
    }

    return (
        <>
            <input className={styles.search_bar} onChange={handleChange} type='text' placeholder="Nome ou valor do item" />
        </>
    );
}