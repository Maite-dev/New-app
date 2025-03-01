// src/components/molecules/SearchBar.tsx
import React from 'react';
import Input from '../atoms/Input';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Llama a la función onSearch para notificar el cambio
    };

    return (
        <Input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default SearchBar;