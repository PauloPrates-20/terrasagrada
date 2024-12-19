'use client';

import { useState, useEffect } from 'react';
import FormSelect from '@/app/components/FormSelect';
import FormInput from '@/app/components/FormInput';

export default function Crafting() {
  const tools = [
    { name: 'Ferramentas de Carpinteiro', value: 'Ferramentas de Carpinteiro', },
    { name: 'Ferramentas de Cartógrafo', value: 'Ferramentas de Cartógrafo', },
    { name: 'Ferramentas de Costureiro', value: 'Ferramentas de Costureiro', },
    { name: 'Ferramentas de Coureiro', value: 'Ferramentas de Coureiro', },
    { name: 'Ferramentas de Entalhador', value: 'Ferramentas de Entalhador', },
    { name: 'Ferramentas de Ferreiro', value: 'Ferramentas de Ferreiro', },
    { name: 'Ferramentas de Funileiro', value: 'Ferramentas de Funileiro', },
    { name: 'Ferramentas de Joalheiro', value: 'Ferramentas de Joalheiro', },
    { name: 'Ferramentas de Oleiro', value: 'Ferramentas de Oleiro', },
    { name: 'Ferramentas de Pedreiro', value: 'Ferramentas de Pedreiro', },
    { name: 'Ferramentas de Pintor', value: 'Ferramentas de Pintor', },
    { name: 'Ferramentas de Sapateiro', value: 'Ferramentas de Sapateiro', },
    { name: 'Ferramentas de Vidreiro', value: 'Ferramentas de Vidreiro', },
    { name: 'Suprimentos de Alquimista', value: 'Suprimentos de Alquimista', },
    { name: 'Suprimentos de Cervejeiro', value: 'Suprimentos de Cervejeito', },
    { name: 'Suprimentos de Caligrafia', value: 'Suprimentos de Caligrafia', },
    { name: 'Utensílios de Cozinheiro', value: 'Utensílios de Cozinheiro', }
  ];

  const tiers = [
    { name: 'Iniciante', value: 15 },
    { name: 'Cobre', value: 30 },
    { name: 'Prata', value: 75 },
    { name: 'Ouro', value: 120 },
    { name: 'Platina', value: 200 },
    { name: 'Cobalto', value: 500 },
    { name: 'Adamante', value: 750 }
  ];

  const rarities = [
    { name: 'Comum', value: 10 },
    { name: 'Incomum', value: 12 },
    { name: 'Raro', value: 16 },
    { name: 'Muito Raro', value: 20 },
    { name: 'Lendário', value: 22 },
  ];

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const [ve, setVe] = useState(25);
  const [price, setPrice] = useState(0);
  const [previousPrice, setpreviousPrice] = useState(0);
  const [newPrice, setnewPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);
  const [rarity, setRarity] = useState('Comum');
  const [cd, setCd] = useState(10);
  const [consumable, setConsumable] = useState<number | boolean>(false);
  const [artificer, setArtificer] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [message, setMessage] = useState('');
  const [finalDate, setFinalDate] = useState(date);
  const [hour, setHour] = useState('');
  const [copy, setCopy] = useState(false);
  const [character, setCharacter] = useState('');
  const [item, setItem] = useState('');
  const [tool, setTool] = useState('');

  function toggleConsumable(value: string | boolean) {
    if (typeof value === 'string') setConsumable(parseInt(value));
    else setConsumable(value);
  }

  function toggleUpgrade(value: string | boolean) {
    if (typeof value === 'boolean') setUpgrade(value);
  }

  function toggleArtificer(value: string | boolean) {
    if (typeof value === 'boolean') setArtificer(value);
  }

  function calcTime(price: number, ve: number): number {
    let time = Math.ceil(price / ve);

    return time;
  }

  async function copyText(message: string) {
    await navigator.clipboard.writeText(message);
  }

  function addDays(date: Date, days: number): Date {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }

  function copyMessage() {
    setHour(`${date.getHours()}:${date.getMinutes()}`);
    setCopy(true);
  }

  useEffect(() => {
    if (newPrice > previousPrice) setPrice(Math.ceil(newPrice - previousPrice) * 0.8)
  }, [newPrice, previousPrice]);

  useEffect(() => {
    let discount = 1;

    if (consumable || artificer) discount = 2;
    if (consumable && artificer) discount = 4;

    setTotal(Math.ceil(price / discount));
  }, [consumable, price, artificer]);

  useEffect(() => {
    artificer ? setTime(Math.ceil(calcTime(total, ve) / 4)) : setTime(calcTime(total, ve));
  }, [total, ve]);

  useEffect(() => {
    setFinalDate(addDays(date, time));
  }, [time]);

  useEffect(() => {
    let tempRarity;

    cd == 10 ? tempRarity = 'Comum' : cd == 12 ? tempRarity = 'Incomum' : cd == 16 ? tempRarity = 'Raro' : cd == 20 ? tempRarity = 'Muito Raro' : tempRarity = 'Lendário';

    setRarity(tempRarity);
  }, [cd]);

  useEffect(() => {
    if (copy) {
      setMessage(
        'Nome: @\n' +
        'Personagem: ' + character + '\n' +
        'Cria: ' + item + '\n' +
        'Raridade: ' + rarity + '\n' +
        'Ferramentas Utilizada: ' + tool + '\n' +
        'Custo de Fabricação: ' + total + '\n' +
        'Data de Início: ' + day + '/' + month + '/' + year + ' ' + hour + '\n' +
        'Data de Término: ' + finalDate.getDate() + '/' + (finalDate.getMonth() + 1) + '/' + finalDate.getFullYear() + ' ' + hour + '\n' +
        'Teste de Arcanismo: ' + '\n' +
        'Teste com ferramenta: '
      );
    }

    setCopy(false);
  }, [copy]);

  useEffect(() => {
    copyText(message);
  }, [message]);

  return (
    <div className='md:flex md:flex-row md:gap-2'>
      <div className='border rounded-2xl border-titleColor py-4 flex flex-col justify-center items-center my-12 mx-auto md:my-0 md:mt-[10%] md:w-1/2'>
        <h1 className='text-3xl font-bold mb-2 text-titleColor'>Calculadora do Artesão</h1>
        <div className='flex flex-col-reverse'>
          <div>
            <h3 className='mb-2 font-bold text-titleColor text-xl'>Projeto</h3>
            <div className='mb-2 flex flex-col gap-2'>
              <FormInput 
                inputId='character'
                text='Personagem: '
                type='text'
                defVal=''
                eventHandler={(value: string | boolean) => setCharacter(value as string)} 
              />
              <FormInput 
                inputId='item'
                text='Item: '
                type='text'
                defVal=''
                eventHandler={(value: string | boolean) => setItem(value as string)} 
              />
              <FormSelect 
                content={tiers}
                text='Tier do artesão: '
                inputId='selectTier'
                eventHandler={(value: string) => setVe(parseInt(value))}
              />
              <FormSelect 
                content={rarities}
                text='Raridade do item: '
                inputId='rarity'
                eventHandler={(value: string) => setCd(parseInt(value))}
              />
              <FormSelect 
                content={tools}
                text='Ferramentas utilizadas: '
                inputId='tools'
                eventHandler={(value: string) => setTool(value)} 
              />
              {upgrade ? (
                <div>
                  <FormInput
                    inputId='previousPrice'
                    text='Valor do item base: '
                    type='number'
                    min={0}
                    max={100000}
                    defVal={0}
                    eventHandler={(value: string | boolean) => setpreviousPrice(parseInt(value as string))}
                  />
                  <FormInput 
                    inputId='newPrice'
                    text='Valor da melhoria: '
                    type='number'
                    min={0}
                    max={100000}
                    defVal={0}
                    eventHandler={(value: string | boolean) => setnewPrice(parseInt(value as string))}
                  />
                </div>
              ) : (
                <FormInput 
                  inputId='price'
                  text='Valor do item: '
                  type='number'
                  min={0}
                  max={100000}
                  defVal={0}
                  eventHandler={(value: string | boolean) => setPrice(parseInt(value as string))}
                />
              )}
              <FormInput inputId='consumable' text='Consumível? ' type='checkbox' defVal={2} eventHandler={toggleConsumable} />
              <FormInput inputId='artificer10' text='Artífice Nv. 10? ' type='checkbox' defVal={1} eventHandler={toggleArtificer} />
              <FormInput inputId='upgrade' text='Upgrade? ' type='checkbox' defVal={1} eventHandler={toggleUpgrade} />
            </div>
          </div>
          <div className='mb-2'>
            <h3 className='mb-2 font-bold text-titleColor text-xl'>Resultado</h3>
            <p>Custo de fabricação: <span>{total} PO</span></p>
            <p>Tempo necessário: <span>{time} dias</span></p>
            <p>CD dos testes: {cd}</p>
          </div>
        </div>
        </div>
        <div className='border rounded-2xl border-titleColor py-4 flex flex-col justify-center items-center my-12 mx-auto md:my-0 md:mt-[10%] md:w-1/2'>
          <h1 className='mb-2 text-3xl font-bold text-titleColor'>Template do post</h1>
          <div>
            <p>Nome: @</p>
            <p>Personagem: {character}</p>
            <p>Cria: {item}</p>
            <p>Raridade: {rarity}</p>
            <p>Ferramentas utilizadas: {tool}</p>
            <p>Custo de fabricação: {total} PO</p>
            <p>Data de Início: {`${day}/${month}/${year}`} {hour && (<span>{hour}</span>)}</p>
            <p>Data de término: {finalDate && (<span>{`${finalDate.getDate()}/${finalDate.getMonth() + 1}/${finalDate.getFullYear()}`}</span>)} {hour && (<span>{hour}</span>)}</p>
            <p>Teste de arcanismo: </p>
            <p>Teste com ferramentas: </p>
            <button onClick={copyMessage} className='self-center text-textColor py-2 px-3 text-xl bg-zinc-700 w-fit border border-titleColor rounded-lg my-3 hover:cursor-pointer hover:shadow-[0_0_24px_8px_#4406067f_inset]'>Copiar</button>
          </div>
      </div>
    </div>
  );
}