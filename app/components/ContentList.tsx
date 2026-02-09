import { ItemTypes, SetTypes } from '../lib/definitions';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { ReactNode, useEffect, useState } from 'react';
import ListItem from './ListItem';
import OrderTab from './OrderTab';

export interface OrderingOptions { attribute: 'name' | 'price'; order: boolean; };

export default function ContentList({
    dataSet,
    icon,
    clickHandler,
}: {
    dataSet: SetTypes;
    icon: ReactNode;
    clickHandler: (item: ItemTypes) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState<ItemTypes[]>(dataSet.items);
    const [orderedData, setOrderedData] = useState<ItemTypes[]>(dataSet.items)
    const [itemOrder, setItemOrder] = useState<OrderingOptions>({ attribute: 'name', order: true });

    function orderItems(options: OrderingOptions) {
        let filteredData = [...data];
        filteredData.sort((a, b) => {
            if (options.attribute === 'name') {
                if (options.order) return a.name.localeCompare(b.name);
                return b.name.localeCompare(a.name);
            } else {
                if (options.order) return a.value - b.value;
                return b.value - a.value;
            }
        });

        setOrderedData(filteredData as ItemTypes[]);
    }

    useEffect(() => {
        setData(dataSet.items);
    }, [dataSet]);

    useEffect(() => {
        orderItems(itemOrder)
    }, [data, itemOrder]);

    return (
        <div className='flex flex-col justify-center items-center w-4/5 h-auto'>
            <button
                onClick={() => setExpanded(!expanded)}
                className={`text-sm md:text-base py-2 px-3 border border-titleColor bg-neutral-700 w-full flex justify-between items-end gap-4 hover:bg-neutral-800 hover:cursor-pointer ${dataSet.rarity.replace(' ', '')}`}
            >
                {dataSet.label} {expanded ? <FaMinusSquare size='1.4rem' /> : <FaPlusSquare size='1.4rem' />}
            </button>
            <div className={`w-full overflow-hidden ${expanded ? 'max-h-fit' : 'max-h-0'}`}>
                <ul>
                    <OrderTab changeOrder={(options: OrderingOptions) => setItemOrder(options)} />
                    {orderedData.map((item, index) => (
                        <ListItem icon={icon} item={item} rarity={dataSet.rarity} key={index} clickHandler={clickHandler} />
                    ))}
                </ul>
            </div>
        </div>
    );
}