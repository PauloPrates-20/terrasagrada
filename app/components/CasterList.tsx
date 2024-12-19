import React from "react";

export default function CasterList({
    content,
    eventHandler
}: {
    content: any[];
    eventHandler: (value: string, lvl: number) => void;
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        eventHandler(e.target.id, parseInt(e.target.value));
    }

    return (
        <>
            {content.map((casterClass, index) => (
                <div className='flex flex-row justify-between items-center gap-2 w-52 mb-2' key={index}>
                    <div className='text-left mb-2'>
                        <label htmlFor={casterClass.value}>{casterClass.name}</label>
                    </div>
                    <div className='mb-2'>
                        <input className='text-black w-10' onChange={handleChange} id={casterClass.value} name={casterClass.value} type='number' defaultValue={0} min={0} max={20} size={2} />
                    </div>
                </div>
            ))}
        </>
    );
}