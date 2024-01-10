export default function FormSelect({ inputId, text, content, eventHandler}) {
  const handleChange = (e) => {
    eventHandler(e.target.value)
  }

  return (
    <div>
      <label htmlFor={inputId}>{text}</label>
      <select name={inputId} id={inputId} onChange={handleChange}>
        {content.map((info) => (
          <option key={info.value} value={info.value}>{info.nome}</option>
        ))}
      </select>
    </div>
  )
}