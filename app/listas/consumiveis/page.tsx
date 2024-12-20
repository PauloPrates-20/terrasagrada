'use client';

import SearchBar from '@/app/components/SearchBar';
import consumables from '@/public/data/consumableItems.json';
import { useEffect, useState } from 'react';
import { ConsumableItem, ConsumableSet } from '@/app/lib/definitions';
import { tiers } from '@/app/lib/tables';
import ConsumableContent from '@/app/components/ConsumableContent';

export default function Consumiveis() {
  const [filtered, setFiltered] = useState<ConsumableItem[]>(consumables);
  const [lists, setLists] = useState<ConsumableSet[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConsumableItem>(consumables[0]);
  const [description, setDescription] = useState<string[]>(selectedItem.description.split('\n'));

  function filterItems(searchText: string) {
    setFiltered(consumables.filter(item => {
      if (
        item.name.toLowerCase().includes(searchText) ||
        item.value.toString().toLowerCase().includes(searchText) ||
        item.rarity.toLowerCase().includes(searchText)
      ) return true;
      return false;
    }));
  }

  function getList(): ConsumableSet[] {
    return [
      {items: filtered.filter(item => item.rarity === 'Common'), label: 'Common', rarity: 'common'},
      {items: filtered.filter(item => item.rarity === 'Uncommon'), label: 'Uncommon', rarity: 'uncommon'},
      {items: filtered.filter(item => item.rarity === 'Rare'), label: 'Rare', rarity: 'rare'},
      {items: filtered.filter(item => item.rarity === 'Very Rare'), label: 'Very Rare', rarity: 'veryrare'},
      {items: filtered.filter(item => item.rarity === 'Legendary'), label: 'Legendary', rarity: 'legendary'},
    ];
  }

  useEffect(() => {
    setLists(getList());
  }, [filtered]);

  useEffect(() => {
    setDescription(selectedItem.description.split('\n'));
  }, [selectedItem])

	return (
		<div className='flex flex-col-reverse w-full justify-center items-center h-[120dv] md:my-12 md:mx-auto md:flex-row md:items-start md:justify-start md:min-h-fit md:h-dvh md:gap-2'>
      <div className='h:1/2 w-full border border-titleColor rounded-xl md:w-1/2 md:h-full'>
        <h1 className='font-bold text-3xl text-titleColor my-4'>Consumíveis</h1>
        <SearchBar eventHandler={filterItems}/>
        <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll'>
          {lists.map((list, index) => (
            <ConsumableContent dataSet={list} key={index} clickHandler={(item: ConsumableItem) => setSelectedItem(item)} />
          ))}
        </div>
      </div>
      <div className='p-4 h-96 w-full relative mb-4 border border-titleColor rounded-xl flex flex-col md:my-0 md:mx-auto md:w-1/2 md:h-fit md:text-base overflow-scroll scroll'>
        <a className='font-bold text-3xl text-titleColor my-4' href={selectedItem.url} target='_blank' title='Open in 5e.tools'>
          {selectedItem.name}
        </a>
        <div>
          <div className='flex justify-between items-center cursor-default'>
            <p title={selectedItem.source.name}>{selectedItem.source.initials}</p>
            <p className='text-gold'>{selectedItem.value} PO</p>
          </div>
          <div className='flex justify-between items-center cursor-default mb-4 pb-2 border-b border-titleColor'>
            <p>{selectedItem.rarity} Consumable</p>
            <p>Tier: <span style={{ color: tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].color}}>{tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].name}</span></p>
          </div>
        </div>
        <div>
          {description.map((text, index) => (
            <p className='mb-2 text-justify' key={index}>{text}</p>
          ))}
        </div>
      </div>
    </div>
	);
}