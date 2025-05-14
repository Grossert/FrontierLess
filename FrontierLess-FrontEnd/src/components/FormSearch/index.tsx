import { useState } from 'react';

interface Filter {
    action: string;
    property: string;
    condition: string;
    value: string;
    status: string;
    exchangeType: string
}

interface Props {
    onFilterChange: (filterValue: string, value: any) => void;
}

export default function FormSearch({ onFilterChange }: Props) {
    const [filters, setFilters] = useState<Filter[]>([
        { action: 'Include', property: 'Referring domain', condition: 'Exactly matching', value: '', status: '', exchangeType: '' },
    ]);

    const handleInputChange = (index: number, field: keyof Filter, value: string) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    
        if (field === 'value') {
            onFilterChange('destination', value);
        } else {
            onFilterChange(field, value);
        }
    };
    

    const handleClearAll = () => {
        const resetFilter = { action: 'Include', property: 'Referring domain', condition: 'Exactly matching', value: '', status: '', exchangeType: '' };
        setFilters([resetFilter]);
        onFilterChange('destination', '');
        onFilterChange('status', '');
        onFilterChange('exchangeType', '');
    };

    return (
        <>
            {filters.map((filter, index) => (
                <div key={index} className="flex space-x-3 w-full mb-3">
                    <div className="flex flex-col space-y-1 w-full flex-grow-[2]">
                        <label htmlFor="searchDestination" className="text-gray-700 font-medium">Procurar Destino</label>
                        <input
                            type="text"
                            id="searchDestination"
                            value={filter.value}
                            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                            placeholder="Procurar"
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 w-full flex-grow">
                        <label htmlFor="status" className="text-gray-700 font-medium">Status</label>
                        <select
                            id="status"
                            value={filter.status}
                            onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:ring focus:ring-blue-500">
                            <option value=""></option>
                            <option value="progredindo">Progredindo</option>
                            <option value="hiato">Hiato</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="abandonado">Abandonado</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-1 w-full flex-grow">
                        <label htmlFor="exchangeType" className="text-gray-700 font-medium">Tipo de intercâmbio</label>
                        <select
                            id="exchangeType"
                            value={filter.exchangeType}
                            onChange={(e) => handleInputChange(index, 'exchangeType', e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:ring focus:ring-blue-500">
                            <option value=""></option>
                            <option value="idioma">Idioma</option>
                            <option value="escola">Escola</option>
                            <option value="faculdade">Faculdade</option>
                            <option value="pós-graduação">Pós-graduação</option>
                            <option value="pesquisa">Pesquisa</option>
                        </select>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-4">
                <button onClick={handleClearAll} className="text-gray-600">Limpar Filtros</button>
            </div>
        </>
    );
}
