export default function MultClass({
	content,
	text,
	inputId,
	eventHandler,
} : {
	content: any[],
	text: string,
	inputId: string,
	eventHandler: (value: string, id: string) => void
}) {
	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		eventHandler(e.target.value, e.target.id);
	}

	return (
		<div>
			<label htmlFor={inputId}>{text}</label>
			<select name={inputId} id={inputId} className='text-black' onChange={handleChange}>
				<option value='none'>Selecionar Classe</option>
				{content.map((info, index) => (
					<option key={index} value={info.value}>{info.name}</option>
				))}
			</select>
		</div>
	);
}