import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const useClientes = (search: string, page: number, token: string) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/clientes?page=${page}&search=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                console.log("Data from API:", data); // <-- Verificar la estructura de la data
                setClientes(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, [search, page, token]);

    return { clientes, loading, error: null, totalPages: 1 }; // No estamos manejando el error aquí
};

export default useClientes;