import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import api from '../../settings/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component'
import Propertie from '../properties/Propertie';
import useSWR from 'swr';
import Skeleton from '../compGeneral/Skeleton';

const PropertiesUser = ({ userId }) => {
    // const [propertyType, setPropertyType] = useState('');
    // const [searchText, setSearchText] = useState('');
    // const [transactionType, setTransactionType] = useState('');
    // const [queryParams, setQueryParams] = useState({});
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(2);

    const getProperties = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await api.get(`/property/list/user/${userId}/`, {
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

    const { data: properties, isLoading, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/property/list/user/${userId}/`,
        () => getProperties()
    );

    // const totalPages = Math.ceil(data?.count / pageSize)
    // const arrayPages = []
    // for (let index = 1; index <= totalPages; index++) {
    //     arrayPages.push(index)
    // }

    // const properties = data?.results || [];

    // const handleSearch = () => {
    //     setQueryParams({
    //         type: propertyType,
    //         text: searchText,
    //         transaction: transactionType
    //     });
    //     setPage(1); // Reiniciar a la primera página en una nueva búsqueda
    //     mutate();
    // }

    // const handleClear = () => {
    //     setPropertyType('');
    //     setSearchText('');
    //     setTransactionType('');
    //     setQueryParams({
    //         type: '',
    //         text: '',
    //         transaction: ''
    //     });
    //     setPage(1); // Reiniciar a la primera página en una nueva búsqueda
    //     mutate();
    // }

    // const verifyParamsLength = useMemo(() => {
    //     return Object.values(queryParams).some(value => value !== '');
    // }, [queryParams]);

    // const handlePageChange = (newPage) => {
    //     setPage(newPage);
    //     mutate();
    // }

    // const handlePrevPage = () => {
    //     if (page > 0) {
    //         setPage((prev) => prev - 1);
    //     }
    //     return
    // }
    // const handleNextPage = () => {
    //     if (page < totalPages) {
    //         setPage((prev) => prev + 1);
    //     }
    //     return
    // }

    // useEffect(() => {
    //     setQueryParams({
    //         type: '',
    //         text: '',
    //         transaction: ''
    //     });
    // }, []);

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
        <div className='my-4 space-y-5'>
            {properties.map((propertie) => (
                <Propertie propertie={propertie} key={propertie.id} userPost={1} />
            ))}
        </div>
    );
}

export default PropertiesUser