"use client";
import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import customStyles from "../styles/customStyles";
import * as XLSX from "xlsx";
import { post } from "@/services/api";
import { useRouter } from "next/navigation";
import { Cliente } from "@/interfaces/interfaceClientes";

interface CreateButtonProps {
  formTitle?: string;
  enpoint: string;
  token?: string;
  handleCargarTabla: () => void;
  disabled?: boolean;
}

const CreateButtonCargaDeArchivos: React.FC<CreateButtonProps> = ({
  formTitle = "Insertar Archivo de Clientes",
  enpoint,
  token,
  handleCargarTabla,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dataArray, setDataArray] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setDataArray([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  };

  const processFile = (uploadedFile: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

        const transformedData: Cliente[] = jsonData.map((row: any) => ({
          id: 0, // La API asignará el ID
          razon_social: row["Razon Social"] || "", //Asegúrate de que coincidan los nombres de las columnas en Excel
          rif: row["RIF"] || "",
          telefono: row["Telefono"] || "",
          email: row["Email"] || "",
          direccion: row["Direccion"] || "",
          contribuyente_especial: row["Contribuyente Especial"] === "TRUE", //Ajusta según el formato en tu archivo
          retencion_islr: row["Retencion ISLR"] || "0",
          retencion_islr_otro: row["Retencion ISLR Otro"] || "0",
          retencion_iva: row["Retencion IVA"] || "0",
          tipo_de_cliente: row["Tipo de Cliente"] || "",
          createdAt: new Date().toISOString(), // Puedes usar la fecha actual o dejar que la API lo maneje
          updatedAt: new Date().toISOString(),
        }));
        setDataArray(transformedData);
      }
    };

    reader.readAsBinaryString(uploadedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dataArray.length === 0) {
      Swal.fire({
        title: "Error",
        text: "No hay datos procesados para enviar.",
        icon: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    try {
      await post(enpoint, dataArray, token);
      Swal.fire({
        title: "¡Clientes enviados!",
        text: "Los clientes se han procesado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#39853D",
      });
      handleCargarTabla();
      router.refresh();
      closeModal();
    } catch (error) {
      console.error("Error al enviar los clientes:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar los clientes. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={disabled}
        className="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 bg-blue-500 hover:bg-blue-700 text-white"
      >
        <FaPlus size={14} />
        <span>Subir Archivo</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Cargar Archivo"
        ariaHideApp={false}
      >
        <h2 className="text-lg font-bold mb-4 bg-blue-400 text-white rounded-md px-4 py-2">
          {formTitle}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Subir Archivo (XLSX o CSV)
            </label>
            <input
              id="file"
              type="file"
              accept=".xlsx, .csv"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {dataArray.length > 0 && (
            <div className="overflow-x-auto">
              <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-md shadow">
                <table className="min-w-full bg-white text-xs">
                  <thead className="bg-blue-500 text-white sticky top-0 z-10">
                    <tr>
                      <th className="py-1 px-2 text-left">Razón Social</th>
                      <th className="py-1 px-2 text-left">RIF</th>
                      <th className="py-1 px-2 text-left">Teléfono</th>
                      <th className="py-1 px-2 text-left">Email</th>
                      <th className="py-1 px-2 text-left">Dirección</th>
                      <th className="py-1 px-2 text-left">Contrib. Esp.</th>
                      <th className="py-1 px-2 text-left">Retención ISLR</th>
                      <th className="py-1 px-2 text-left">Retención IVA</th>
                      <th className="py-1 px-2 text-left">Tipo de Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataArray.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-t ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
                      >
                        <td className="py-1 px-2 text-left">{item.razon_social}</td>
                        <td className="py-1 px-2 text-left">{item.rif}</td>
                        <td className="py-1 px-2 text-left">{item.telefono}</td>
                        <td className="py-1 px-2 text-left">{item.email}</td>
                        <td className="py-1 px-2 text-left">{item.direccion}</td>
                        <td className="py-1 px-2 text-left">{String(item.contribuyente_especial)}</td>
                        <td className="py-1 px-2 text-left">{item.retencion_islr}</td>
                        <td className="py-1 px-2 text-left">{item.retencion_iva}</td>
                        <td className="py-1 px-2 text-left">{item.tipo_de_cliente}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-span-1 flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="bg-gray-300 text-gray-950 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateButtonCargaDeArchivos;