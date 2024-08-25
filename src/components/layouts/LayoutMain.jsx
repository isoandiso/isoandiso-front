import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { BiMenuAltLeft } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io"
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLogin } from "react-icons/md"
import { BiSolidChat } from "react-icons/bi"
import { FaPlus } from "react-icons/fa6";
import { SiWechat } from "react-icons/si";
import ChatBot from '../compGeneral/ChatBot';
import Loading from '../compGeneral/Loading';
import { Dropdown, Button, Avatar } from '@rewind-ui/core'

import useUser from '../../hooks/useUser';

const links = [
    {
        link: "/",
        text: "Inicio",
        id: 1,
    },
    {
        link: "/nosotros",
        text: "Nosotros",
        id: 2,
    },
    {
        link: "/ia/inicioia",
        text: "Servicios",
        id: 3,
    },
    {
        link: "/blog",
        text: "Blog",
        id: 4,
    },
    {
        link: "/contacto",
        text: "contacto",
        id: 5,
    },

];

const LayoutMain = () => {

    const { isAuth, logout } = useUser()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1024);
    const [isLoading, setIsLoading] = useState(true);
    // const [isOpen, setIsOpen] = useState(false);


    const handleResize = () => {
        setIsLgScreen(window.innerWidth >= 1024);
    };

    setTimeout(() => {
        setIsLoading(false)
    }, 300);

    window.addEventListener('resize', handleResize);

    const [windowDimension, setWindowDimension] = useState({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
    });


    const signOff = async () => {
        await logout()
    }

    const [chatBot, setChatBot] = useState(false);
    const toggleChatbot = () => {
        setChatBot(!chatBot);
    };

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="flex justify-between items-center px-5 md:px-8">
                            <div className="flex items-center pl-8">
                                <Link to={"/"} className="text-white flex justify-start items-center font-semibold text-xl h-24 pr-4">
                                    <img src="/public/img/logoss.png" alt="" width="70" height="20" />
                                </Link>
                                <div
                                    className={`absolute ${isMenuOpen ? 'flex' : 'hidden'} h-screen z-30 bg-black bg-opacity-75 top-0 bottom-0 left-0 flex lg:flex right-0 justify-center items-center gap-5  font-bold p-3 lg:p-0 lg:static lg:bg-transparent lg:h-auto`}
                                >
                                    {
                                        isMenuOpen ? (
                                            <button
                                                onClick={() => setIsMenuOpen(false)} className='bg-red-600 absolute top-5 right-5 rounded-full transition-colors duration-300 hover:bg-red-800  p-3'
                                            >
                                                <AiOutlineClose className='text-white text-2xl font-bold' />
                                            </button>
                                        ) : null
                                    }
                                    <div className='flex flex-col gap-10 lg:gap-5 lg:flex-row'>
                                        {links.map(link => (
                                            <Link
                                                to={link.link}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-white text-3xl lg:text-gray-700 font-bold lg:text-[20px] transition-opacity duration-300 hover:text-purple1 hover:opacity-75 font-ubuntu "
                                                key={link.id}
                                            >
                                                {link.text}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? <AiOutlineClose className="text-[35px] text-gray-500" /> : <AiOutlineMenu className="text-[35px] text-gray-500" />}
                                </button>
                            </div>
                            <div className='flex flex-col md:flex-row'>
                                <Link className="bg-white hover:bg-purple1 hover:text-white m-2 p-2 items-center flex text-gray-700 border border-purple1 justify-center font-urbanist" to="/usuario/publicar">
                                    <FaPlus />
                                    Registrarse
                                </Link>
                                {
                                    isAuth ? (
                                        <Dropdown itemColor="green" radius="none">
                                            <Dropdown.Trigger itemColor="blue">
                                                <Button color='green' radius="none" className='m-2 p-2 h-[42px] w-[90.27px] font-urbanist text-[17px]'>
                                                    Usuario
                                                </Button>

                                            </Dropdown.Trigger>
                                            <Dropdown.Content className='font-urbanist'>
                                                <Dropdown.Item>
                                                    <Link to="/usuario/cuenta">
                                                        Mi perfil
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    Messages
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={signOff}>
                                                    Cerrar sesión
                                                </Dropdown.Item>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="bg-purple1 hover:bg-gray-400 m-2 p-2 items-center flex text-white justify-center z-60"
                                        >
                                            <MdLogin className="text-2xl" />
                                            <p className="text-sm font-urbanist">Iniciar Sesión</p>

                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                        <main className='bg-gray-200 '>
                            <Outlet />
                        </main>

                        <footer className=' bg-white'>
                            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8 p-14'>
                                <div className='flex'>
                                    <div className='flex-1 font-josefin '>
                                        <p className='text-gray-700 font-ubuntu  font-bold mb-2'>ISO AND ISO</p>
                                        <span className='text-gray-400 font-urbanist'> Somos una empresa de integración de tecnología y somos expertos en ayudar a digitalizar sistemas operativos según estándares ISO.</span>
                                    </div>
                                </div>
                                <div className='bg-white text-gray-400 text-sm flex-1 font-urbanist'>
                                    <p className='text-gray-700 font-ubuntu  font-bold text-base'>Accesos directos</p>
                                    <nav>
                                        <p className='p-2 hover:text-purple1'>Inicio</p>
                                        <p className='p-2 hover:text-purple1'>Buscar propiedades</p>
                                        <p className='p-2 hover:text-purple1'>Asesores</p>
                                        <p className='p-2 hover:text-purple1'>Contactos</p>
                                        <p className='p-2 hover:text-purple1'>Nosotros</p>
                                        <p className='p-2 hover:text-purple1'>Politica de privacidad</p>
                                    </nav>
                                </div>
                                <div className='flex-1 bg-white font-urbanist'>
                                    <p className='text-gray-700 font-ubuntu  font-bold'>Contáctanos</p>
                                    <ul>
                                        <li className='flex items-center mb-2'>
                                            <div className='m-3'>
                                                <BiSolidPhoneCall className='text-purple1 text-2xl' />
                                            </div>
                                            <div className='text-gray-500 text-sm'>
                                                <h5>TELEFONO</h5>
                                                (511) 4444 555
                                            </div>
                                        </li>
                                        <li className='flex items-center'>
                                            <div className='bg-white m-3'>
                                                <IoIosMail className='text-purple1 text-2xl' />
                                            </div>
                                            <div className='flex flex-col text-xs'>
                                                <h5 className='text-gray-500 whitespace-normal'>EMAILS</h5>
                                                <a className='text-blue-500' href="info@remax.net.pe">isoandiso@email.com</a>
                                                <a className='text-blue-500' href="">iso@com.pe</a>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className='text-center inset-x-0 flex justify-center bg-white p-4'>
                                        <ul className='justify-center flex text-purple1 text-3xl bg-white p-4 shadow-md shadow-purple1  pl-10 pr-10 '>
                                            <li>
                                                <FaFacebookF className="ml-1 " />
                                            </li>
                                            <li>
                                                <FaYoutube className="ml-8" />
                                            </li>
                                            <li>
                                                <FaTiktok className="ml-8" />
                                            </li>
                                            <li>
                                                <FaInstagram className="ml-8" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs mx-auto flex justify-center text-white bg-purple1 p-5">
                                <nav>
                                    <span>© Copyright RolandGuti 2024 - Términos y Condiciones de Uso Política de privacidad.</span>
                                </nav>
                            </div>
                        </footer>
                        {/* <div className='fixed bottom-3 right-3 z-50' >
                            <button className='bg-purple1 p-5 rounded-full text-white text-4xl animate-pulse' onClick={toggleChatbot}>
                                <SiWechat />
                            </button>

                            <div className={`bg-gray-200 right-3  transition-transform duration-300 absolute top-[-410px] p-0 text-gray-600 shadow-lg ${chatBot ? 'translate-x-0' : 'translate-x-[500px]'}`}>
                                <ChatBot />
                            </div>
                        </div> */}
                    </div>
                )
            }
        </>
    )
}
export default LayoutMain


