export default function FormInput({ inputId, type, text, defVal, min, max, size, eventHandler }) {
  const handleChange = (e) => {
    if(e.target.type == 'number') {
      eventHandler(e.target.value, e.target.id)
    }
    else if(e.target.type == 'checkbox') {
      e.target.checked ? eventHandler(e.target.value) : eventHandler(false)
    }
    else {
      eventHandler(e.target.value)
    }
  }

  return (
    <div>
      <label htmlFor={inputId}>{text}</label>
      <input type={type} name={inputId} id={inputId} defaultValue={defVal} min={min} max={max} size={size} onChange={handleChange} />
    </div>
  )
}