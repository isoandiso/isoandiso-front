import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import api from '../../settings/api';
import { FaSearch, FaFilter } from "react-icons/fa";
import Propertie from '../../components/properties/Propertie';
import { Selector } from '@rewind-ui/core';
import Skeleton from '../../components/compGeneral/Skeleton';
import { Button } from '@rewind-ui/core';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const SearchProp = () => {
    const [propertyType, setPropertyType] = useState('');
    const [searchText, setSearchText] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [queryParams, setQueryParams] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const getProperties = async (type = '', text = '', transaction = '', page = 1, pageSize = 10) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await api.get('/property/list/', {
                params: {
                    type,
                    text,
                    transaction,
                    page,
                    page_size: pageSize
                },
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return []; // Devuelve un array vacío en caso de error
        }
    }

    const { data, isLoading, mutate } = useSWR(
        queryParams.type !== undefined ? `${import.meta.env.VITE_API_URL}/property/list/?type=${queryParams.type}&text=${queryParams.text}&transaction=${queryParams.transaction}&page=${page}&page_size=${pageSize}` : null,
        () => getProperties(queryParams.type, queryParams.text, queryParams.transaction, page, pageSize)
    );

    const totalPages = Math.ceil(data?.count / pageSize)
    const arrayPages = []
    for (let index = 1; index <= totalPages; index++) {
        arrayPages.push(index)
    }

    const properties = data?.results || [];

    const handleSearch = () => {
        setQueryParams({
            type: propertyType,
            text: searchText,
            transaction: transactionType
        });
        setPage(1); // Reiniciar a la primera página en una nueva búsqueda
        mutate();
    }

    const handleClear = () => {
        setPropertyType('');
        setSearchText('');
        setTransactionType('');
        setQueryParams({
            type: '',
            text: '',
            transaction: ''
        });
        setPage(1); // Reiniciar a la primera página en una nueva búsqueda
        mutate();
    }

    const verifyParamsLength = useMemo(() => {
        return Object.values(queryParams).some(value => value !== '');
    }, [queryParams]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        mutate();
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
        return
    }
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
        return
    }

    useEffect(() => {
        setQueryParams({
            type: '',
            text: '',
            transaction: ''
        });
    }, []);

    if (isLoading) {
        return (
            <div className='space-y-5 py-5'>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        )
    }

    return (
        <div className='p-3'>
            {
                verifyParamsLength ? (
                    <button
                        type='button'
                        className='bg-blue2 p-1 rounded flex items-center gap-1 justify-center text-white mb-3'
                        onClick={handleClear}
                    >
                        <FaFilter /> Limpiar Busqueda
                    </button>
                ) : null
            }

            <div className='bg-white rounded container space-y-4 lg:space-y-0 p-2 mx-auto lg:grid lg:grid-cols-5 lg:gap-x-5'>
                <div className='lg:col-span-3 flex flex-col gap-y-5 sm:gap-x-5 sm:flex-row items-center justify-between'>
                    <div className='w-full xs:w-1/2 mx-auto'>
                        <select
                            id="propertyType"
                            name="propertyType"
                            autoComplete="property-type"
                            className="inline-flex w-full justify-center border border-gray-300 shadow-sm px-5 py-3 bg-white text-[16px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100 font-urbanist rounded"
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                        >
                            <option value=''>Todos</option>
                            <option value='casa'>Casa</option>
                            <option value='terreno'>Terreno/Lote</option>
                            <option value='habitacion'>Habitación</option>
                            <option value='hotel'>Hotel</option>
                            <option value='cochera'>Cochera</option>
                            <option value='industrial'>Local industrial</option>
                            <option value='comercial'>Local comercial</option>
                            <option value='oficina'>Oficina</option>
                            <option value='todos'>Todos</option>
                        </select>
                    </div>
                    <Selector value={transactionType} onChange={(value) => setTransactionType(value)} className='xs:hidden' color='green' size='md'>
                        <Selector.Tab anchor="Venta" label="VENTA" />
                        <Selector.Tab anchor="Alquiler" label="ALQUILER" />
                        <Selector.Tab anchor="Pre-venta" label="PRE-VENTA" />
                    </Selector>
                    <Selector value={transactionType} onChange={(value) => setTransactionType(value)} className='hidden xs:flex' color='green' size='lg'>
                        <Selector.Tab anchor="Venta" label="VENTA" />
                        <Selector.Tab anchor="Alquiler" label="ALQUILER" />
                        <Selector.Tab className='w-[180px]' anchor="Pre-venta" label="PRE-VENTA" />
                    </Selector>
                </div>
                <div className='lg:col-span-2 flex items-center gap-3'>
                    <input
                        type="search"
                        placeholder="Ingresa ubicaciones o características"
                        className="inline-flex justify-center w-full border border-gray-200 shadow-sm px-5 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        type="button"
                        className="px-5 py-3 bg-green-500 text-white hover:bg-gray-500 focus:outline-none items-center flex text-mx font-bold"
                        onClick={handleSearch}
                    >
                        <FaSearch className='flex mr-1 selection:' /> Buscar
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-700 text-center p-4 font-ubuntu  ">Resultados : {properties.length} Inmuebles en la Zona.</h2>
            <div className='my-4 space-y-5'>
                {properties.map((propertie) => (
                    <Propertie propertie={propertie} key={propertie.id} />
                ))}
            </div>

            {/* codigo para la paginacion xd */}
            <div className='my-10 w-full flex justify-center'>
                <div className=' flex gap-2 flex-wrap'>
                    <Button
                        shadow='base'
                        disabled={page == 1}
                        color='red'
                        onClick={handlePrevPage}
                    >
                        <GrPrevious className='font-bold' />
                    </Button>
                    {
                        arrayPages.map(pageBtn => (
                            <button
                                className={`py-1 px-4 rounded-full border border-green-500 ${page == pageBtn ? 'bg-green-500 text-white' : ''}`}
                                type='button'
                                onClick={() => handlePageChange(pageBtn)}
                            >
                                {pageBtn}
                            </button>
                        ))
                    }
                    <Button
                        shadow='base'
                        color='blue'
                        onClick={handleNextPage}
                        disabled={page == totalPages}
                    >
                        <GrNext className='font-bold' />
                    </Button>
                </div>


            </div>
        </div>
    );
}

export default SearchProp;

