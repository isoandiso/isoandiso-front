import React, { useState } from 'react'
import useUser from '../../hooks/useUser'
import { Outlet, Link } from 'react-router-dom'
import { SlSettings } from "react-icons/sl"
import { Dropdown, Button } from '@rewind-ui/core'
import UpdateUser from '../../components/userAccount/UpdateUser'
import ChangePassword from '../../components/userAccount/ChangePassword'
import useSWR from 'swr'
import api from '../../settings/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import PropertiesUser from '../../components/userAccount/PropertiesUser'

export const UserAccount = () => {
    const navigate = useNavigate()
    const { logout } = useUser()
    const [currentView, setCurrentView] = useState('none');

    const getUser = async () => {
        const token = localStorage.getItem('AUTH_TOKEN_PROPIA');

        try {
            const response = await api.get('/auth/profile/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return response.data
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }
    };

    const { data: user, IsLoading, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/auth/profile/`,
        getUser
    )

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
                    await logout()
                    const response = await api.delete(`/auth/${id}/`);
                    if (response.status == 204) {
                        navigate('/')
                    }

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

    return (
        <div className='bg-white flex items-center justify-center border-t-2'>
            <div className='lg:px-10 md:px-3 items-center'>
                <h3 className='text-gray-900 text-3xl font-ubuntu'>Mi cuenta</h3>
                <div className='text-center border-gray-500 font-urbanist'>
                    <h3 className='text-center lg:text-[25px] md:text-[20px]'>Datos personales</h3>
                    <div className='flex'>
                        <div className="flex -space-x-2 overflow-hidden">
                            <img
                                className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                        <div className='font-urbanist'>
                            <div className="py-2 px-4 border-t lg:text-[35px] sm:text-[25px] font-urbanist">Nombre: {user?.first_name} {user?.last_name}</div>
                            <div className="py-2 px-4">Correo: {user?.email}</div>
                            <div className="py-2 px-4">Celular: {user?.phone}</div>
                            <div className="py-2 px-4 border-b flex space-x-2"></div>
                        </div>
                        <div>
                            <Dropdown radius='sm' itemColor='green'>
                                <Dropdown.Trigger>
                                    <Button color='gray'>
                                        <SlSettings className='text-[20px] font-bold' />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Item onClick={() => setCurrentView('update')}>
                                        Editar Datos
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setCurrentView('change')}>
                                        Cambiar contraseña
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => handleDelete(user.id)}>
                                        Eliminar Cuenta
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    {currentView === 'update' && (
                        <UpdateUser user={user} setShowUpdateUser={() => setCurrentView('none')} mutate={mutate} />
                    )}
                </div>
                <div>
                    {currentView === 'change' && (
                        <ChangePassword setShowChangePassword={() => setCurrentView('none')} />
                    )}
                </div>
                <div>
                    <PropertiesUser userId={user?.id} />
                </div>
            </div>
        </div>
    )
}
