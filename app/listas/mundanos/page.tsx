'use client';

import SearchBar from '@/app/components/SearchBar';
import mundane from '@/public/data/mundaneItems.json';
import { useEffect, useState } from 'react';
import { ItemTypes, MundaneItem, MundaneSet, PageFilter } from '@/app/lib/definitions';
import ContentList from '@/app/components/ContentList';
import { GiTwoHandedSword } from 'react-icons/gi';
import Filter from '@/app/components/Filter';
import ListFrame from '@/app/components/ListFrame';
import ItemFrame from '@/app/components/ItemFrame';
import BuyButton from '@/app/components/BuyButton';

export default function Mundanos() {
    const [filtered, setFiltered] = useState<MundaneItem[]>(mundane);
    const [searchedItems, setSearchedItems] = useState<MundaneItem[]>(mundane);
    const [lists, setLists] = useState<MundaneSet[]>([]);
    const [selectedItem, setSelectedItem] = useState<MundaneItem>(mundane[0]);
    const [types, setTypes] = useState<string[]>([]);
    const [filterOptions, setFilterOptions] = useState<PageFilter>({ minValue: 1, maxValue: 100000, attunement: undefined });
    const [searchText, setSearchText] = useState('');

    function getSearchString(searchString: string) {
        setSearchText(searchString)
    }

    function searchItems() {
        setSearchedItems(mundane.filter(item => {
            if (
                item.name.toLowerCase().includes(searchText) ||
                item.type.some(prop => prop.toLowerCase().includes(searchText)) ||
                item?.properties?.some(prop => prop.name.toLocaleLowerCase().includes(searchText))
            ) return true;
            return false;
        }));
    }

    function filterItems() {
        setFiltered(mundane.filter(item => {
            let ok = false;
            if (
                item.value >= filterOptions.minValue &&
                item.value <= filterOptions.maxValue
            ) ok = true;

            return ok;
        }))
    }

    function getList(): MundaneSet[] {
        return [
            { items: searchedItems.filter(item => item.type.includes('simple') && item.type.includes('melee')), label: 'Simple Melee Weapons', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('simple') && item.type.includes('ranged')), label: 'Simple Ranged Weapons', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('martial') && item.type.includes('melee')), label: 'Martial Melee Weapons', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('martial') && item.type.includes('ranged')), label: 'Martial Ranged Weapons', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('light')), label: 'Light Armors', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('medium')), label: 'Medium Armors', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('heavy')), label: 'Heavy Armors', rarity: 'common' },
            { items: searchedItems.filter(item => item.type.includes('shield')), label: 'Shields', rarity: 'common' },
        ];
    }

    function changeFilterOptions(option: string, value?: number | boolean) {
        setFilterOptions(state => ({ ...state, [option]: value }));
    }

    function arrangeAndCapitalizeTypes(): string[] {
        const arrangedTypes: string[] = []
        const typeOrder = {
            simple: 0,
            martial: 0,
            light: 0,
            medium: 0,
            heavy: 0,
            shield: 0,
            melee: 1,
            ranged: 1,
            armor: 1,
            weapon: 2
        };

        selectedItem.type.forEach(prop => {
            arrangedTypes[typeOrder[prop as keyof typeof typeOrder]] = prop;
        });

        arrangedTypes.forEach((prop, index) => {
            arrangedTypes[index] = prop.charAt(0).toUpperCase() + prop.slice(1);
        });

        return arrangedTypes;
    }

    useEffect(() => {
        setLists(getList());
    }, [searchedItems]);

    useEffect(() => {
        setTypes(arrangeAndCapitalizeTypes());
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
                    <h1 className='text-3xl'>Itens Mundanos</h1>
                    <Filter options={{ value: true }} changePageFilter={changeFilterOptions} />
                </div>
                <SearchBar eventHandler={getSearchString} />
                <div className='w-full h-2/3 flex justify-start items-center flex-col overflow-scroll overscroll-none scroll mb-4'>
                    {lists.map((list, index) => (
                        <ContentList icon={<GiTwoHandedSword size='1.5rem' />} dataSet={list} key={index} clickHandler={(item: ItemTypes) => setSelectedItem(item as MundaneItem)} />
                    ))}
                </div>
            </ListFrame>
            <ItemFrame>
                <a className='font-bold text-3xl text-titleColor my-4' href={selectedItem.url} target='_blank' title='Open in 5e.tools'>
                    {selectedItem.name}
                </a>
                <div>
                    <div className='flex justify-between items-center cursor-default mb-4 pb-2 border-b border-titleColor'>
                        <p>{types.map((type, index) => <span key={index}>{type} </span>)}</p>
                        <p className='text-gold'>{selectedItem.value} PO</p>
                    </div>
                </div>
                <div>
                    <div className='text-justify'>
                        <h3 className='font-bold text-xl text-titleColor my-2'>Detalhes</h3>
                        <p className='text-titleColor'>Weight: <span className='text-textColor'>{selectedItem.weight}</span></p>
                        {selectedItem.damage && (
                            <p className='text-titleColor'>Damage: <span className='text-textColor'>{selectedItem.damage.dice} {selectedItem.damage.type}</span></p>
                        )}
                        {selectedItem.ac && (
                            <p className='text-titleColor'>AC: <span className='text-textColor'>{selectedItem.ac}</span></p>
                        )}
                        {selectedItem.strength && (
                            <p className='text-titleColor'>Required strenght: <span className='text-textColor'>{selectedItem.strength.replace('For', '')}</span></p>
                        )}
                        {selectedItem.stealth && (
                            <p className='text-titleColor'>Stealth: <span className='text-textColor'>disadvantage</span></p>
                        )}
                    </div>
                    {selectedItem.properties && (
                        <div className='text-justify my-2 border-t border-titleColor'>
                            <h3 className='font-bold text-xl text-titleColor my-2'>Properties</h3>
                            {selectedItem.properties.map((prop, index) => (
                                <p key={index} className='text-titleColor mb-2'>{prop.name} <span className='text-textColor'>{prop.description}</span></p>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex justify-center items-center'>
                    <BuyButton name={selectedItem.name} value={selectedItem.value} />
                </div>
            </ItemFrame>
        </div>
    );
}