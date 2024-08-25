import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import api from '../../settings/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await api.get('/property/list/admin/');
                setProperties(response?.data);
                setFilteredProperties(response?.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        const filteredData = properties.filter(property =>
            property.type_operation.toLowerCase().includes(search.toLowerCase()) ||
            property.type_property.toLowerCase().includes(search.toLowerCase()) ||
            property.subtype_property.toLowerCase().includes(search.toLowerCase()) ||
            property.first_name.toLowerCase().includes(search.toLowerCase()) ||
            property.last_name.toLowerCase().includes(search.toLowerCase()) ||
            property.phone_number.includes(search) ||
            property.adress.toLowerCase().includes(search.toLowerCase()) ||
            property.area_property.toLowerCase().includes(search.toLowerCase()) ||
            property.type_currency.toLowerCase().includes(search.toLowerCase()) ||
            property.price.toString().includes(search)
        );

        setFilteredProperties(filteredData);
    }, [search, properties]);


    const handleDelete = async (id) => {
        // Mostrar la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la propiedad de forma permanente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Realizar la solicitud DELETE a la API
                    await api.delete(`/property/${id}/`);

                    // Actualizar el estado local eliminando la propiedad
                    setProperties(properties.filter(property => property.id !== id));
                    setFilteredProperties(filteredProperties.filter(property => property.id !== id));

                    // Mostrar una alerta de éxito
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'Propiedad eliminada exitosamente.',
                        icon: 'success'
                    });
                } catch (error) {
                    console.error('Error deleting property:', error);

                    // Mostrar una alerta de error
                    Swal.fire({
                        title: 'Error al eliminar la propiedad',
                        text: 'Hubo un problema al intentar eliminar la propiedad.',
                        icon: 'error'
                    });
                }
            }
        });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading data</p>;

    const columns = [
        {
            name: 'Tipo de operación',
            selector: row => row.type_operation,
            width: '155px'
            // sortable: true,
        },
        {
            name: 'Tipo',
            selector: row => row.type_property,
            width: '120px'
            // sortable: true,
        },
        {
            name: 'Subtipo',
            selector: row => row.subtype_property,
            width: '120px'
            // sortable: true,
        },
        {
            name: 'Vendedor',
            selector: row => `${row.first_name} ${row.last_name}`,
            // sortable: true,
        },
        {
            name: 'Número',
            selector: row => row.phone_number,
            // sortable: true,
            width: '100px'
        },
        {
            name: 'Dirección',
            selector: row => row.adress,
            // sortable: true,
        },
        {
            name: 'Área',
            selector: row => row.area_property,
            // sortable: true,
            width: '100px'
        },
        {
            name: 'Moneda',
            selector: row => row.type_currency,
            // sortable: true,
            width: '88px'
        },
        {
            name: 'Precio',
            selector: row => row.price,
            width: '110px'
            // sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="flex space-x-2">
                    <Link to={`/admin/propiedades/detail/${row.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        <FaEye />
                    </Link>
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
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Propiedades</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={filteredProperties}
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
        </div>
    );
}

export default Properties;
