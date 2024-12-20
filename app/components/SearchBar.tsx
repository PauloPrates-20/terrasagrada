export default function SearchBar({ eventHandler }: { eventHandler: (value: string) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    eventHandler(e.target.value.toLowerCase());
  }

  return (
    <>
      <input 
        type="text"
        onChange={handleChange} 
        placeholder='Nome, valor ou propriedades do item...' 
        className='w-4/5 h-8 text-sm border border-titleColor rounded-md my-4 mx-auto text-black'
      />
    </>
  );
}