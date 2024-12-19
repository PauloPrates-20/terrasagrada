export default function SearchBar({ eventHandler }: { eventHandler: (value: string) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    eventHandler(e.target.value);
  }

  return (
    <>
      <input 
        type="text"
        onChange={handleChange} 
        placeholder='Nome, valor ou propriedades do item...' 
        className='w-4/5 h-10 border border-titleColor rounded-md my-4 mx-auto'
      />
    </>
  );
}