'use client';

import SearchBar from '@/app/components/SearchBar';
import infusions from '@/public/data/artificerInfusions.json';
import { useEffect, useState } from 'react';
import { ArtificerInfusion, InfusionSet, ItemTypes, PageFilter } from '@/app/lib/definitions';
import ContentList from '@/app/components/ContentList';
import { GiMagicAxe } from 'react-icons/gi';
import Filter from '@/app/components/Filter';
import ListFrame from '@/app/components/ListFrame';
import ItemFrame from '@/app/components/ItemFrame';

export default function Artifice() {
  const [filtered, setFiltered] = useState<ArtificerInfusion[]>(infusions);
  const [searchedItems, setSearchedItems] = useState<ArtificerInfusion[]>(infusions);
  const [lists, setLists] = useState<InfusionSet[]>([]);
  const [selectedItem, setSelectedItem] = useState<ArtificerInfusion>(infusions[0]);
  const [description, setDescription] = useState<string[]>(selectedItem.description.split('\n'));
  const [rarity, setRarity] = useState('Common');
  const [filterOptions, setFilterOptions] = useState<PageFilter>({ minValue: 1, maxValue: 100000, attunement: undefined, reforge: undefined });
  const [searchText, setSearchText] = useState('');

  function getSearchString(searchString: string) {
    setSearchText(searchString)
  }

  function searchItems() {
    setSearchedItems(filtered.filter(item => {
      if (item.name.toLowerCase().includes(searchText)) return true;
      return false;
    }));
  }

  function filterItems() {
    setFiltered(infusions.filter(item => {
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

      return ok;
    }))
  }

  function getList(): InfusionSet[] {
    return [
      { items: searchedItems.filter(item => item.level === 2), label: 'Uncommon', rarity: 'uncommon' },
      { items: searchedItems.filter(item => item.level === 6), label: 'Rare', rarity: 'rare' },
      { items: searchedItems.filter(item => item.level === 10), label: 'Very Rare', rarity: 'veryrare' },
      { items: searchedItems.filter(item => item.level === 14), label: 'Legendary', rarity: 'legendary' },
    ];
  }

  function changeFilterOptions(option: string, value?: number | boolean) {
    setFilterOptions(state => ({ ...state, [option]: value }));
  }

  useEffect(() => {
    setLists(getList());
  }, [searchedItems]);

  useEffect(() => {
    let newRarity = 'Uncommon';

    switch (selectedItem.level) {
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
  }, [selectedItem]);

  useEffect(() => {
    filterItems();
  }, [filterOptions]);

  useEffect(() => {
    searchItems();
  }, [filtered, searchText]);

  return (
    <div className='flex flex-col-reverse w-full justify-center items-center h-[120dv] md:my-12 md:mx-auto md:flex-row md:items-start md:justify-start md:min-h-fit md:h-dvh md:gap-2'>
      <ListFrame>
        <div className='flex text-titleColor font-bold justify-center items-center my-4 select-none'>
          <h1 className='text-3xl'>Infusões de Artífice</h1>
          <Filter options={{ value: true, attunement: true }} changePageFilter={changeFilterOptions} />
        </div>
        <SearchBar eventHandler={getSearchString} />
        <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll mb-4'>
          {lists.map((list, index) => (
            <ContentList icon={<GiMagicAxe size='1.5rem' />} dataSet={list} key={index} clickHandler={(item: ItemTypes) => setSelectedItem(item as ArtificerInfusion)} />
          ))}
        </div>
      </ListFrame>
      <ItemFrame>
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
      </ItemFrame>
    </div>
  );
}