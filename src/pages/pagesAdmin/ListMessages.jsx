import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from 'react-data-table-component';
import api from '../../settings/api';
import Swal from 'sweetalert2';

const fetcher = (url) => api.get(url).then((res) => res.data);

function ListMessages() {
    const { data: messages, error, mutate } = useSWR('/contact/list/', fetcher);
    const [search, setSearch] = useState('');
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(() => {
        if (messages) {
            setFilteredMessages(messages.filter(message =>
                (message.nombres && message.nombres.toLowerCase().includes(search.toLowerCase())) ||
                (message.email && message.email.toLowerCase().includes(search.toLowerCase())) ||
                (message.tipo_solicitud && message.tipo_solicitud.toLowerCase().includes(search.toLowerCase())) ||
                (message.celular && message.celular.toLowerCase().includes(search.toLowerCase())) ||
                (message.mensaje && message.mensaje.toLowerCase().includes(search.toLowerCase()))
            ));
        }
    }, [messages, search]);

    const handleStateServed = async (message, newServed) => {
        const updatedMessage = { ...message, atendido: newServed };
        try {
            const response = await api.put(`/contact/${message.id}/`, updatedMessage);
            mutate();
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el mensaje de forma permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/contact/${id}/`);
                    mutate(messages.filter(message => message.id !== id), false);

                    Swal.fire({
                        title: "Eliminado",
                        text: "Mensaje eliminado de manera exitosa.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: 'Hubo un problema al intentar eliminar el mensaje.',
                        icon: 'error',
                    });
                }
            }
        });
    };

    if (!messages) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading data</p>;

    const columns = [
        {
            name: 'N°',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Información del Contacto',
            selector: row => `${row.nombres}, ${row.email}, ${row.celular}`,
            format: row => (
                <div>
                    <div><strong>Nombres:</strong> {row.nombres}</div>
                    <div><strong>Email:</strong> {row.email}</div>
                    <div><strong>Celular:</strong> {row.celular}</div>
                </div>
            ),
            width: '300px'
        },
        {
            name: 'Tipo de solicitud',
            selector: row => row.tipo_solicitud,
            width: '150px',
        },
        {
            name: 'Mensaje',
            selector: row => `${row.mensaje}`,
            format: row => (
                <p className="whitespace-pre-wrap break-words">{row.mensaje}</p>
            ),
        },
        {
            name: 'Atendido',
            cell: row => (
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={row.atendido}
                        onChange={(e) => handleStateServed(row, e.target.checked)}
                    />
                    <div className="peer rounded-full outline-none duration-100 after:duration-500 w-16 h-8 bg-green-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500  after:content-['No'] after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-8 peer-checked:after:content-['Si'] peer-checked:after:border-white"></div>
                </label>
            ),
            width: '100px'
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="flex space-x-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(row.id)}>
                        <MdDelete />
                    </button>
                </div>
            ),
            width: '100px'
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <div className="p-6 max-w-7xl mx-auto font-urbanist">
            <h1 className="text-2xl font-bold mb-4">Mensajes</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <DataTable
                columns={columns}
                data={filteredMessages}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent={<div>No se encontraron registros para mostrar</div>}
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: '#f8f9fa',
                            fontWeight: 'bold',
                            fontSize: '.9rem',
                            margin: '0 auto',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            textAlign: 'center'
                        },
                    },
                    cells: {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            textAlign: 'center',
                            overflow: 'hidden',
                            wordBreak: 'break-word'
                        },
                    },
                    rows: {
                        style: {
                            '&:hover': {
                                backgroundColor: '#f1f3f5',
                            },
                            textAlign: 'center',
                        },
                    },
                }}
            />
        </div>
    );
}

export default ListMessages;
