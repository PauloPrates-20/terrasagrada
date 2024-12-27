import { CgSortAz } from 'react-icons/cg';
import { FilteringOptions } from '../lib/definitions';
import { useState } from 'react';

export default function Filter({ options, changePageFilter }: { options: FilteringOptions; changePageFilter: (option: string, value?: number | boolean) => void }) {
  const [expanded, setExpanded] = useState(false);

  function changeMinPrice(e: React.ChangeEvent<HTMLInputElement>) {
    changePageFilter('minValue', parseInt(e.target.value));
  }

  function changeMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
    changePageFilter('maxValue', parseInt(e.target.value));
  }

  function changeAttunement(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value === 'undefined' ? undefined : parseInt(e.target.value);
    changePageFilter('attunement', value);
  }

  function changeReforge(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value === 'undefined' ? undefined : parseInt(e.target.value);
    changePageFilter('reforge', value);
  }

  return (
    <>
      <CgSortAz size='2.5rem' className='hover:cursor-pointer active:cursor-default' onClick={() => setExpanded(!expanded)} />
      <div 
        className={`left-1/2 -bottom-full md:-bottom-1/3 -translate-x-1/2 bg-bgColor border z-20 border-titleColor w-4/5 flex flex-col gap-2 py-4 px-1 ${expanded ? 'absolute' : 'hidden'}`}
      >
        <div className='mb-8 flex flex-col gap-2'>
          {options.value && (
              <div className='flex flex-col justify-center items-start'>
                <p className='font-bold'>Value</p>
                <div className='flex justify-between items-center gap-2 text-textColor'>
                  <div className='flex gap-1'>
                    <label htmlFor='minPrice'>Min.:</label>
                    <input type="number" id='minPrice' name='minPrice' min={0} max={100000} className='text-black rounded-sm' defaultValue={0} onChange={changeMinPrice} />
                  </div>
                  <div className='flex gap-1'>
                    <label htmlFor='maxPrice'>Max.:</label>
                    <input type="number" id='maxPrice' name='maxPrice' min={0} max={100000} className='text-black rounded-sm' defaultValue={100000} onChange={changeMaxPrice} />
                  </div>
                </div>
              </div>
            )}
            {options.attunement && (
              <div className='flex flex-col justify-center items-start'>
                <p className='font-bold'>Attunement</p>
                <div className='flex justify-between items-center gap-2 text-textColor'>
                  <div className='flex gap-1'>
                    <div className='flex gap-1'>
                      <label htmlFor='yes'>Yes</label>
                      <input type="radio" id='yes' value={1} name='attunement' onChange={changeAttunement} />
                    </div>
                    <div className='flex gap-1'>
                      <label htmlFor='no'>No</label>
                      <input type="radio" id='no' value={0} name='attunement' onChange={changeAttunement} />
                    </div>
                    <div className='flex gap-1'>
                      <label htmlFor='any'>Any</label>
                      <input type="radio" id='any' value='undefined' name='attunement' defaultChecked onChange={changeAttunement} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {options.reforge && (
              <div className='flex flex-col justify-center items-start'>
              <p className='font-bold'>Reforjable</p>
              <div className='flex justify-between items-center gap-2 text-textColor'>
                <div className='flex gap-1'>
                  <div className='flex gap-1'>
                    <label htmlFor='reforgeYes'>Yes</label>
                    <input type="radio" id='reforgeYes' value={1} name='reforge' onChange={changeReforge} />
                  </div>
                  <div className='flex gap-1'>
                    <label htmlFor='reforgeNo'>No</label>
                    <input type="radio" id='reforgeNo' value={0} name='reforge' onChange={changeReforge} />
                  </div>
                  <div className='flex gap-1'>
                    <label htmlFor='reforgeAny'>Any</label>
                    <input type="radio" id='reforgeAny' value='undefined' name='reforge' defaultChecked onChange={changeReforge} />
                  </div>
                </div>
              </div>
            </div>
            )}
        </div>
        <button className='border border-titleColor font-bold rounded-md w-fit px-2 py-1 mx-auto' onClick={() => setExpanded(false)}>CLOSE</button>
      </div>
    </>
  );
}