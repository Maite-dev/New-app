// src/app/clientes/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Cliente } from '@/interfaces/interfaceClientes';
import { columnsClientes } from '@/components/data/ClientesColumns';

// Importa Componentes Atómicos
import Typography from '@/components/atoms/Typography';
import SearchBar from '@/components/molecules/SearchBar';
import ClientesTable from '@/components/organisms/ClientesTable';
import Pagination from '@/components/atoms/Pagination';
import CreateButtonCargaDeArchivos from "@/components/organisms/CreateButtonCargaDeArchivos"; // Importa el componente para cargar archivos
import useClientes from '@/hooks/useClientes';

const ClientesPage: React.FC<{ searchParams: { search?: string; page?: string } }> = ({ searchParams }) => {
    const search = searchParams?.search || "";
    const initialPage = Number(searchParams?.page) || 1;
    const [page, setPage] = useState(initialPage);
    const [token, setToken] = useState("");
    const { clientes, totalPages, loading, error } = useClientes(search, page, token);
    const handleSearch = useCallback((searchTerm: string) => {
        console.log('Buscando:', searchTerm);
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("x-token="))
                ?.split("=")[1];
    
            console.log("Token obtenido:", storedToken);
            setToken(storedToken || "");
        }
        fetchToken();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        console.error("Error al cargar los datos:", error);
        return <div>Error al cargar los datos.</div>;
    }

    return (
        <section>
            <div className="flex items-center justify-between bg-blue-100 px-6 py-3 rounded-lg shadow-md my-4"> {/* Estilos para el encabezado */}
                <Typography variant="h1">Clientes</Typography>
                <div className="w-1/2">
                    <SearchBar placeholder="Buscar..." onSearch={handleSearch} />
                </div>
         
      <CreateButtonCargaDeArchivos
        enpoint="/api/clientes/upload" // Ajusta el endpoint si es necesario
        token={token}
        handleCargarTabla={ () => useClientes(search,page,token)} // Pasar la función para recargar
      />
    
    </div>
    <ClientesTable initialData={clientes} columns={columnsClientes} />
    <Pagination
      totalPages={totalPages}
      currentPage={page}
      onPageChange={handlePageChange}
    />
  </section>
);
};

export default ClientesPage;