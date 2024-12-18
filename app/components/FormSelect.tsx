export default function FormSelect({
    inputId,
    text,
    content,
    eventHandler,
}: {
    inputId: string,
    text: string,
    content: any[],
    eventHandler: (value: string) => void 
}) {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        eventHandler(e.target.value);
    }

    return (
        <div>
            <label htmlFor={inputId}>{text}</label>
            <select name={inputId} id={inputId} onChange={handleChange}>
                {content.map((info, index) => (
                    <option key={index} value={info.value}>{info.name}</option>
                ))}
            </select>
        </div>
    );
}