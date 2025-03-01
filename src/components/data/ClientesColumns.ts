import { Cliente } from '@/interfaces/interfaceClientes';
import { format } from 'date-fns';
import { TableColumn } from 'react-data-table-component';

export const columnsClientes: TableColumn<Cliente>[] = [
  { name: "Razón Social", selector: (row: Cliente) => row.razon_social, sortable: true },
  { name: "RIF", selector: (row: Cliente) => row.rif, sortable: true },
  { name: "Teléfono", selector: (row: Cliente) => row.telefono, sortable: true },
  { name: "Email", selector: (row: Cliente) => row.email, sortable: true },
  { name: "Dirección", selector: (row: Cliente) => row.direccion, sortable: true },
  { name: "Contribuyente Especial", selector: (row: Cliente) => row.contribuyente_especial ? "Sí" : "No", sortable: true },
  { name: "Retención ISLR", selector: (row: Cliente) => row.retencion_islr, sortable: true },
  { name: "Retención IVA", selector: (row: Cliente) => row.retencion_iva, sortable: true },
  { name: "Fecha de Creación", selector: (row: Cliente) => format(new Date(row.createdAt), 'dd/MM/yyyy'), sortable: true },
];