// src/components/atoms/Pagination.tsx
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="mx-2 text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;