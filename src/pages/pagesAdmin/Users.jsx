import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import api from '../../settings/api';
import Swal from 'sweetalert2';

const fetcher = (url) => api.get(url).then((res) => res.data);

function Users() {
    const { data: users, error, mutate } = useSWR('/auth/list/', fetcher);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (users) {
            setFilteredUsers(users.filter(user => 
                (user.first_name && user.first_name.toLowerCase().includes(search.toLowerCase())) ||
                (user.last_name && user.last_name.toLowerCase().includes(search.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
                (user.phone && user.phone.toLowerCase().includes(search.toLowerCase()))
            ));
        }
    }, [users, search]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el usuario de forma permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/auth/${id}/`);
                    mutate(users.filter(user => user.id !== id), false);

                    Swal.fire({
                        title: "Eliminado",
                        text: "Producto eliminado de manera exitosa.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: 'Hubo un problema al intentar eliminar el usuario.',
                        icon: 'error',
                    });
                }
            }
        });
    };

    if (!users) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading data</p>;

    const columns = [
        {
            name: 'N°',
            selector: (row, index) => index + 1,
            width: '65px'
        },
        {
            name: 'Nombres',
            selector: row => row.first_name,
        },
        {
            name: 'Apellidos',
            selector: row => row.last_name,
        },
        {
            name: 'E-mail',
            selector: row => row.email,
        },
        {
            name: 'Celular',
            selector: row => row.phone,
            width: '110px'
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
            <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>
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
                data={filteredUsers}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent={<div>No se encontraron registros para mostrar</div>}
                customStyles={{
                    headCells: {
                        style: {
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
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
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            textAlign: 'center'
                        },
                    },
                    rows: {
                        style: {
                            '&:hover': {
                                backgroundColor: '#f1f3f5',
                            },
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            textAlign: 'center'
                        },
                    },
                }}
            />
        </div>
    );
}

export default Users;
