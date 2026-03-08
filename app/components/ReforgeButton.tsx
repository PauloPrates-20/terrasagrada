import { Item } from "../lib/definitions";
import { reforgeItem, getId } from "../lib/actions";
import { getCharacters } from "../lib/db";
import swal from 'sweetalert2'

interface Props {
    name: string,
    value: number,
}

const customSwal = {
    popup: 'bg-bgColor border border-titleColor border-solid',
    title: 'text-titleColor',
    htmlContainer: 'text-textColor',
    input: 'border border-solid border-titleColor rounded-md !text-textColor',
    confirmButton: 'bg-bgColor text-titleColor border border-solid border-titleColor rounded-md w-20 font-bold',
    cancelButton: 'bg-[#632824] text-titleColor border border-solid border-titleColor rounded-md font-bold'
}

export default function ReforgeButton({ name, value }: Props) {
    const item: Item = {
        name: name,
        value: value,
        url: ''
    };

    const handleClick = async() => {
        const id = await getId();

        if(typeof id !== 'string') {
            swal.fire({
                title: id.error,
                icon: 'error',
                customClass: {
                    ...customSwal
                }
            });
            return;
        }

        const characters = await getCharacters(id);

        if(characters.length === 0) {
            swal.fire({
                title: 'Nenhum personagem encontrado!',
                icon: 'error',
                customClass: {
                    ...customSwal
                }
            });
            return;
        }

        const options: Record<string, string> = {};

        for (const char of characters) {
            options[char.name] = char.name;
        }

        const char = await swal.fire({
            title: 'Escolher personagem',
            customClass: {
                ...customSwal
            },
            input: 'select',
            inputOptions: {
                personagens: options
            },
            inputPlaceholder: 'Selecione um personagem',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '') resolve('Selecione um personagem.');
                    else resolve();
                });
            }
        })

        if(!(char.value || typeof char.value === 'string')) {
            swal.fire({
                title: 'Compra cancelada',
                customClass: {
                    ...customSwal
                },
            });
            return;
        }

        const character = characters.find(character => char.value === character.name);

        if(!character) {
            swal.fire({
                title: 'Não foi possível carregar o personagem!',
                customClass: { ...customSwal },
                icon: 'error',
            });
            return;
        }

        if(character.inventory.length === 0) {
            swal.fire({
                title: 'Nenhum item para reforjar!',
                icon: 'error',
                customClass: {
                    ...customSwal
                }
            });
            return;
        }
        
        const itemOptions: Record<string, string> = {};
        
        for(const item of character.inventory) {
            itemOptions[item.name] = item.name;
        }

        const baseItem = await swal.fire({
            title: 'Escolher item',
            customClass: { ...customSwal },
            input: 'select',
            inputOptions: {
                items: itemOptions,
            },
            inputPlaceholder: 'Selecione o item',
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '') resolve('Selecione um item!');
                    else resolve();
                })
            }
        });

        if(!(baseItem.value || typeof baseItem.value !== 'string')) {
            swal.fire({
                title: 'Compra cancelada!',
                customClass: {
                    ...customSwal
                },
            });
            return;
        }

        const isUpgradeResult = await swal.fire({
            title: 'Upgrade',
            text: 'O novo item é um upgrade direto do anterior?',
            showDenyButton: true,
            showConfirmButton: true,
            denyButtonText: 'Não',
            confirmButtonText: 'Sim',
            customClass: { ...customSwal },
        });

        if(isUpgradeResult.isDismissed) {
            swal.fire({
                title: 'Compra cancelada',
                customClass: {
                    ...customSwal
                },
            });
            return;
        }

        const res = await reforgeItem(item, baseItem.value, char.value, isUpgradeResult.isConfirmed);

        if(res.message) {
            swal.fire({
                title: res.message,
                icon: 'success',
                customClass: {
                    ...customSwal
                }
            });
            return;
        }


        swal.fire({
            title: res.error,
            text: typeof res.details === 'string' && res.details,
            icon: 'error',
            customClass: {
                ...customSwal
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            className='py-4 px-2 border border-titleColor rounded-md w-24 font-bold'
        >
            Reforge
        </button>
    );
}