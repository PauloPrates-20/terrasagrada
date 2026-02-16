'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import NavList, { Options } from './NavList';

export default function Dropdown() {
    const [display, setDisplay] = useState(false);

    const navLists: Options[] = [
        { name: 'Consumíveis', url: '/listas/consumiveis' },
        { name: 'Itens Mágicos', url: '/listas/itensmagicos' },
        { name: 'Itens Mundanos', url: '/listas/mundanos' },
        { name: 'Variantes Mágicas', url: '/listas/variante' }
    ];

    const navTools: Options[] = [
        { name: 'Calculadora de HP', url: '/ferramentas/calculadorahp' },
        { name: 'Nível de Conjurador', url: '/ferramentas/conjurador' },
        { name: 'Calculadora do Artesão', url: '/ferramentas/crafting' },
        { name: 'Grimório do Mago', url: '/ferramentas/grimorio' }
    ];

    return (
        <>
            <nav
                className='absolute left-0 flex flex-row flex-wrap justify-start w-full'
            >
                <FaBars
                    onClick={() => setDisplay(!display)}
                    className='flex cursor-pointer mt-1 ml-3 mb-3 justify-start items-end'
                />
                <div
                    className={`flex flex-col absolute left-0 top-3 mt-10 pb-4 bg-barColor w-full sm:w-72 max-h-0 opacity-0 invisible rounded-[0_0_6px_0] transition-all ease-out duration-200 ${display ? 'isChecked' : 'notChecked'}`}
                >
                    <a
                        href='/'
                        className='select-none relative no-underline text-xl text-textColor py-3 px-4 mx-0 w-full hover:shadow-[0_0_24px_8px_inset_#4406067f]'
                    >
                        Home
                    </a>
                    <a
                        href='http://vtt.terrasagrada.net.br'
                        className='select-none relative no-underline text-xl text-textColor py-3 px-4 mx-0 w-full hover:shadow-[0_0_24px_8px_inset_#4406067f]'
                    >
                        Foundry
                    </a>
                    <NavList label='Listas' options={navLists} />
                    <NavList label='Ferramentas' options={navTools} />
                </div>
            </nav>
        </>
    );
}