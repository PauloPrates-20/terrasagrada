export default function MultiClasse({ content, text, inputId, eventHandler }) {
  const handleChange = (e) => {
    eventHandler(e.target.value, e.target.id)
  }

  return (
    <div>
      <label htmlFor={inputId}>{text}</label>
      <select name={inputId} id={inputId} onChange={handleChange}>
        <option value='none'>Selecionar Classe</option>
        {content.map((info, index) => (
          <option key={index} value={info.value}>{info.nome}</option>
        ))}
      </select>
    </div>
  )
}