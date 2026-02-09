import React from "react";
import { Entries } from "../lib/definitions"

type Props = {
    entries: Entries;
};

function renderEntry(entry: Entries[number], key: React.Key): React.ReactNode {
    if (typeof entry === 'string') {
        return (
            <p key={key} className="mb-2 text-justify">
                {entry}
            </p>
        );
    }

    if (entry.type === 'entries') {
        const [first, ...rest] = entry.entries;

        return (
            <div key={key} className="mb-3">
                {typeof first === 'string' ? (
                    <p className="mb-2 text-justify">
                        <span className="text-gold">
                            {entry.name}.{' '}
                        </span>
                        {first}
                    </p>
                ) : (
                    <>
                        <p className="mb-2 text-justify">
                            <span className="font-semibold">
                                {entry.name}.
                            </span>
                        </p>
                        {renderEntry(first, `${key}-first`)}
                    </>
                )}

                {rest.length > 0 && (
                    <Entry entries={rest} />
                )}
            </div>
        );
    }

    if (entry.type === 'list') {
        return (
            <ul key={key} className="list-disc pl-5 mb-3">
                {entry.items.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <li key={index} className="text-justify">
                                {item}
                            </li>
                        );
                    }

                    const entries = item.entries ?? [];
                    const hasEntries = entries.length > 0;
                    const [first, ...rest] = entries;


                    return (
                        <li key={index} className="mb-1 text-justify">
                            {item.entry && (
                                <>
                                    <span className="text-gold">
                                        {item.name}.{' '}
                                    </span>
                                    {item.entry}
                                </>
                            )}

                            {!item.entry && hasEntries && typeof first === 'string' && (
                                <p className="mb-2">
                                    <span className="text-gold">
                                        {item.name}.{' '}
                                    </span>
                                    {first}
                                </p>
                            )}

                            {!item.entry && hasEntries && typeof first !== 'string' && (
                                <>
                                    <p className="mb-2">
                                        <span className="text-gold">
                                            {item.name}.
                                        </span>
                                    </p>
                                    {renderEntry(first, `${index}-first`)}
                                </>
                            )}

                            {rest.length > 0 && (
                                <Entry entries={rest} />
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return null;
}

export default function Entry({ entries }: Props) {
    return (
        <>
            {entries.map((entry, index) =>
                renderEntry(entry, `entry-${index}`)
            )}
        </>
    );
}