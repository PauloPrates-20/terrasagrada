import { Item } from "../lib/definitions";
import { buyItem, getId } from "../lib/actions";
import { getCharacters } from "../lib/db";
import swal from 'sweetalert2'

interface Props {
  id: number,
  name: string,
  value: number,
}

const customSwal = {
  popup: 'bg-bgColor border border-titleColor border-solid',
  title: 'text-titleColor',
  input: 'border border-solid border-titleColor rounded-md !text-textColor',
  confirmButton: 'bg-bgColor text-titleColor border border-solid border-titleColor rounded-md w-20 font-bold',
  cancelButton: 'bg-[#632824] text-titleColor border border-solid border-titleColor rounded-md font-bold'
}

export default function BuyButton({ id, name, value }: Props) {
  const item: Item = {
    id: id,
    name: name,
    value: value,
    url: ''
  };

  function handleClick() {
    getId()
      .then((id) => {
        if (typeof id !== 'string') {
          swal.fire({
            title: id.error,
            icon: 'error',
            customClass: {
              ...customSwal
            }
          });
          return;
        }

        getCharacters(id)
          .then((characters) => {
            if (Object.keys(characters).length === 0) {
              swal.fire({
                title: 'Nenhum personagem encontrado',
                icon: 'error',
                customClass: {
                  ...customSwal
                }
              });
              return;
            }

            const options: { [key: string]: string } = {}

            for (const key in characters) {
              options[key] = characters[key].name;
            }

            swal.fire({
              title: 'Escolher personagem',
              customClass: {
                ...customSwal
              },
              input: 'select',
              inputOptions: {
                Personagens: options
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
              .then((character) => {
                if (!character.value || typeof character.value !== 'string') {
                  swal.fire({
                    title: 'Compra cancelada',
                    customClass: {
                      ...customSwal
                    },
                  });
                  return;
                }

                buyItem(item, character.value).then((res) => {
                  if (res.message) {
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
                    icon: 'error',
                    customClass: {
                      ...customSwal
                    }
                  });
                });
              });
          });
      });
  }

  return (
    <button
      onClick={handleClick}
      className='py-4 px-2 border border-titleColor rounded-md w-24 font-bold'
    >
      Buy
    </button>
  );
}