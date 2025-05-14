import React, { useState, useEffect } from 'react';

interface Props {
    id: any,
    name: any,
    label: any,
    disabled?: boolean,
    children: React.ReactNode,
    select?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Select({ id, name, label, children, disabled, select, onChange }: Props) {

    const [selectedStatus, setSelectedStatus] = useState(select || '');
    const handleStatusChange = (e: any) => {
        setSelectedStatus(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="max-w-sm mx-auto w-full">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select value={selectedStatus} disabled={disabled} id={id} name={name} onChange={handleStatusChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {children}
            </select>
        </div>

    )
}
