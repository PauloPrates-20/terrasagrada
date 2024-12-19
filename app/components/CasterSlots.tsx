import { SpellSlot } from '../lib/definitions';

export default function CasterSlots({ slots }: { slots: SpellSlot[] }) {
    return (
        <div className='flex flex-wrap justify-center items-center p-1 gap-2'> 
            {slots.map((slot, index) => (
                <div key={index} className='flex flex-col justify-center items-center border border-titleColor p-2 rounded'>
                    <p className='border-b border-titleColor'>{slot.level}</p>
                    <p>{slot.quantity}</p>
                </div>
            ))}
        </div>
    );
}