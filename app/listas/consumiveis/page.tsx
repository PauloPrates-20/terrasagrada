'use client';

import SearchBar from '@/app/components/SearchBar';
import consumables from '@/public/data/consumableItems.json';
import { useEffect, useState } from 'react';
import { ConsumableItem, ConsumableSet, ItemTypes, PageFilter } from '@/app/lib/definitions';
import { tiers } from '@/app/lib/tables';
import ContentList from '@/app/components/ContentList';
import { GiPotionBall } from 'react-icons/gi';
import Filter from '@/app/components/Filter';
import ListFrame from '@/app/components/ListFrame';
import ItemFrame from '@/app/components/ItemFrame';
import BuyButton from '@/app/components/BuyButton';

export default function Consumiveis() {
  const [filtered, setFiltered] = useState<ConsumableItem[]>(consumables);
  const [searchedItems, setSearchedItems] = useState<ConsumableItem[]>(consumables)
  const [lists, setLists] = useState<ConsumableSet[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConsumableItem>(consumables[0]);
  const [description, setDescription] = useState<string[]>(selectedItem.description.split('\n'));
  const [searchText, setSearchText] = useState('');
  const [filterOptions, setFilterOptions] = useState<PageFilter>({ minValue: 1, maxValue: 100000, attunement: undefined, reforge: undefined });

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
    setFiltered(consumables.filter(item => {
      let ok = false;
      if (
        item.value >= filterOptions.minValue &&
        item.value <= filterOptions.maxValue
      ) ok = true;

      return ok;
    }))
  }

  function getList(): ConsumableSet[] {
    return [
      { items: searchedItems.filter(item => item.rarity === 'Common'), label: 'Common', rarity: 'common' },
      { items: searchedItems.filter(item => item.rarity === 'Uncommon'), label: 'Uncommon', rarity: 'uncommon' },
      { items: searchedItems.filter(item => item.rarity === 'Rare'), label: 'Rare', rarity: 'rare' },
      { items: searchedItems.filter(item => item.rarity === 'Very Rare'), label: 'Very Rare', rarity: 'veryrare' },
      { items: searchedItems.filter(item => item.rarity === 'Legendary'), label: 'Legendary', rarity: 'legendary' },
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
      <ListFrame>
        <div className='flex text-titleColor font-bold justify-center items-center my-4 select-none'>
          <h1 className='text-3xl'>Consumíveis</h1>
          <Filter options={{ value: true }} changePageFilter={changeFilterOptions} />
        </div>
        <SearchBar eventHandler={getSearchString} />
        <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll mb-4'>
          {lists.map((list, index) => (
            <ContentList icon={<GiPotionBall size='1.5rem' />} dataSet={list} key={index} clickHandler={(item: ItemTypes) => setSelectedItem(item as ConsumableItem)} />
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
            <p>{selectedItem.rarity} Consumable</p>
            <p>Tier: <span style={{ color: tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].color }}>{tiers[selectedItem.rarity.toLowerCase().replace(' ', '') as keyof typeof tiers].name}</span></p>
          </div>
        </div>
        <div>
          {description.map((text, index) => (
            <p className='mb-2 text-justify' key={index}>{text}</p>
          ))}
        </div>
        <div className='flex justify-center items-center'>
          <BuyButton id={selectedItem.id} name={selectedItem.name} value={selectedItem.value} />
        </div>
      </ItemFrame>
    </div>
  );
}