'use client';

import SearchBar from '@/app/components/SearchBar';
import infusions from '@/public/data/artificerInfusions.json';
import { useEffect, useState } from 'react';
import { ArtificerInfusion, InfusionSet, ItemTypes } from '@/app/lib/definitions';
import ContentList from '@/app/components/ContentList';
import { GiMagicAxe } from 'react-icons/gi';

export default function Artifice() {
  const [filtered, setFiltered] = useState<ArtificerInfusion[]>(infusions);
  const [lists, setLists] = useState<InfusionSet[]>([]);
  const [selectedItem, setSelectedItem] = useState<ArtificerInfusion>(infusions[0]);
  const [description, setDescription] = useState<string[]>(selectedItem.description.split('\n'));
  const [rarity, setRarity] = useState('Common');

  function filterItems(searchText: string) {
    setFiltered(infusions.filter(item => {
      if (
        item.name.toLowerCase().includes(searchText) ||
        item.value.toString().toLowerCase().includes(searchText) ||
        item.level.toString().toLowerCase().includes(searchText) ||
        item?.attunement?.toLocaleLowerCase()?.includes(searchText)
      ) return true;
      return false;
    }));
  }

  function getList(): InfusionSet[] {
    return [
      {items: filtered.filter(item => item.level === 2), label: 'Uncommon', rarity: 'uncommon'},
      {items: filtered.filter(item => item.level === 6), label: 'Rare', rarity: 'rare'},
      {items: filtered.filter(item => item.level === 10), label: 'Very Rare', rarity: 'veryrare'},
      {items: filtered.filter(item => item.level === 14), label: 'Legendary', rarity: 'legendary'},
    ];
  }

  useEffect(() => {
    setLists(getList());
  }, [filtered]);

  useEffect(() => {
    let newRarity = 'Uncommon';

    switch(selectedItem.level) {
      case 2:
        newRarity = 'Uncommon';
        break; 
      case 6:
        newRarity = 'Rare';
        break;
      case 10:
        newRarity = 'Very Rare';
        break;
      case 14:
        newRarity = 'Legendary';
        break;
    }

    setDescription(selectedItem.description.split('\n'));
    setRarity(newRarity);
  }, [selectedItem])

	return (
		<div className='flex flex-col-reverse w-full justify-center items-center h-[120dv] md:my-12 md:mx-auto md:flex-row md:items-start md:justify-start md:min-h-fit md:h-dvh md:gap-2'>
      <div className='h:1/2 w-full border border-titleColor rounded-xl md:w-1/2 md:h-full'>
        <h1 className='font-bold text-3xl text-titleColor my-4'>Consumíveis</h1>
        <SearchBar eventHandler={filterItems}/>
        <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll'>
          {lists.map((list, index) => (
            <ContentList icon={<GiMagicAxe size='1.5rem' />} dataSet={list} key={index} clickHandler={(item: ItemTypes) => setSelectedItem(item as ArtificerInfusion)} />
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
            <p>{rarity} Consumable</p>
            <p>Artificer Level: {selectedItem.level}</p>
          </div>
        </div>
        <div>
          {description.map((text, index) => (
            <p className='mb-2 text-justify' key={index}>{text}</p>
          ))}
        </div>
        {selectedItem.attunement && (
          <div className='flex flex-col justify-between items-start text-justify cursor-default mt-4 pt-2 border-t border-titleColor'>
          <p>{selectedItem.attunement}</p>
        </div>
        )}
      </div>
    </div>
	);
}