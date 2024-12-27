'use client';

import SearchBar from '@/app/components/SearchBar';
import magicItems from '@/public/data/magicItems.json';
import { useEffect, useState } from 'react';
import { MagicItem, WondrousSet, ItemTypes, PageFilter } from '@/app/lib/definitions';
import { tiers } from '@/app/lib/tables';
import ContentList from '@/app/components/ContentList';
import { GiRuneStone } from 'react-icons/gi';
import Filter from '@/app/components/Filter';

export default function ItensMagicos() {
  const [filtered, setFiltered] = useState<MagicItem[]>(magicItems);
  const [searchedItems, setSearchedItems] = useState<MagicItem[]>(magicItems);
  const [lists, setLists] = useState<WondrousSet[]>([]);
  const [selectedItem, setSelectedItem] = useState<MagicItem>(magicItems[0]);
  const [description, setDescription] = useState<string[]>(selectedItem.description.split('\n'));
  const [filterOptions, setFilterOptions] = useState<PageFilter>({ minValue: 1, maxValue: 100000, attunement: undefined, reforge: undefined});
  const [searchText, setSearchText] = useState('');

  function getSearchString(searchString: string) {
    setSearchText(searchString)
  }

  function searchItems() {
    setSearchedItems(filtered.filter(item => {
      if (
          item.name.toLowerCase().includes(searchText) ||
          item.attunement?.toLocaleLowerCase()?.includes(searchText)
        ) return true;
      return false;
    }));
  }

  function filterItems() {
    setFiltered(magicItems.filter(item => {
      let ok = false;
      if (
        item.value >= filterOptions.minValue && 
        item.value <= filterOptions.maxValue
      ) ok = true;
      if (typeof filterOptions.attunement !== 'undefined') {
        if (filterOptions.attunement === 0) {
          if (item.attunement) ok = false;
        } else {
          if (!item.attunement) ok = false;
        }
      }
      if (typeof filterOptions.reforge !== 'undefined') {
        if (filterOptions.reforge === 0) {
          if (item.reforge) ok = false;
        } else {
          if (!item.reforge) ok = false;
        }
      }

      return ok;
    }))
  }

  function getList(): WondrousSet[] {
    return [
      {items: searchedItems.filter(item => item.rarity === 'Common'), label: 'Common', rarity: 'common'},
      {items: searchedItems.filter(item => item.rarity === 'Uncommon'), label: 'Uncommon', rarity: 'uncommon'},
      {items: searchedItems.filter(item => item.rarity === 'Rare'), label: 'Rare', rarity: 'rare'},
      {items: searchedItems.filter(item => item.rarity === 'Very Rare'), label: 'Very Rare', rarity: 'veryrare'},
      {items: searchedItems.filter(item => item.rarity === 'Legendary'), label: 'Legendary', rarity: 'legendary'},
    ];
  }

  function changeFilterOptions(option: string, value?: number | boolean) {
    setFilterOptions(state => ({ ...state, [option]: value }));
  }

  useEffect(() => {
    setLists(getList());
  }, [searchedItems]);

  useEffect(() => {
    setDescription(selectedItem.description.split('\n'));
  }, [selectedItem])

  useEffect(() => {
    filterItems();
  }, [filterOptions]);

  useEffect(() => {
    searchItems();
  }, [filtered, searchText]);

	return (
		<div className='flex flex-col-reverse w-full justify-center items-center h-[120dv] md:my-12 md:mx-auto md:flex-row md:items-start md:justify-start md:min-h-fit md:h-dvh md:gap-2'>
      <div className='h:1/2 w-full border border-titleColor rounded-xl md:w-1/2 md:h-full'>
        <div className='flex text-titleColor font-bold justify-center items-center my-4 select-none'>
          <h1 className='text-3xl'>Itens Mágicos</h1>
          <Filter options={{ value: true, attunement: true, reforge: true }} changePageFilter={changeFilterOptions} />
        </div>
        <SearchBar eventHandler={getSearchString}/>
        <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll mb-4'>
          {lists.map((list, index) => (
            <ContentList icon={<GiRuneStone size='1.5rem' />} dataSet={list} key={index} clickHandler={(item: ItemTypes) => setSelectedItem(item as MagicItem)} />
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
            <p className='text-gold'>{selectedItem.value} PO {selectedItem.reforge && (`+ ${selectedItem.reforge.type}`)}</p>
          </div>
          <div className='flex justify-between items-center cursor-default mb-4 pb-2 border-b border-titleColor'>
            <p>{selectedItem.rarity} Wondrous Item</p>
            <p>Tier: <span style={{ color: tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].color}}>{tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].name}</span></p>
          </div>
        </div>
        <div>
          {description.map((text, index) => (
            <p className='mb-2 text-justify' key={index}>{text}</p>
          ))}
        </div>
        {(selectedItem.attunement || selectedItem.reforge) && (
          <div className='flex flex-col justify-between items-start text-justify cursor-default mt-4 pt-2 border-t border-titleColor'>
              {selectedItem.attunement && (
                <p>{selectedItem.attunement}</p>
              )}
              {selectedItem.reforge && (
                <p>Reforge <span className='text-titleColor font-bold'>{selectedItem.reforge.text}</span> at Gront's Forge</p>
              )}
            </div>
        )}
      </div>
    </div>
	);
}