// src/components/organisms/ClientesTable.tsx
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Cliente } from '@/interfaces/interfaceClientes';
import { format } from 'date-fns';

interface Props {
  initialData: Cliente[];
  columns: TableColumn<Cliente>[];
}

const ClientesTable: React.FC<Props> = ({ initialData, columns }) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden"> {/* Contenedor con sombra y bordes redondeados */}
      <DataTable
        columns={columns}
        data={initialData}
        pagination
        className="min-w-full divide-y divide-gray-200" // Ancho mínimo y divisores
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#E0F2FE', // Fondo azul claro para el encabezado
              color: '#000', // Color del texto del encabezado
            },
          },
          rows: {
            style: {
              paddingTop: '1rem',   // Ajuste la cantidad de relleno para que se adapte a sus necesidades
              paddingBottom: '1rem',
              fontSize: '1rem',
            },
          },
          cells: {
            style: {
              paddingLeft: '8px', // Espaciado interno para las celdas
              paddingRight: '8px',
              paddingTop: '10px',
              paddingBottom: '10px',
            },
          },
          // Alternar los colores de las filas
        }}
      />
    </div>
  );
};

export default ClientesTable;