import React from 'react'
import { FaHandshake } from "react-icons/fa"
import { BsFillAlarmFill } from "react-icons/bs"
import { HiHome } from "react-icons/hi2"
import { FaHouseUser } from "react-icons/fa"

function Cards2() {
    return (
        <div>
            <div>
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 m-3">
                    <ul role="list" className="grid gap-x-8 gap-y-12 lg:grid-cols-4 sm:grid-cols-2 sm:gap-y-16 xl:col-span-4 sm:col-span-2 border-gray-300">
                        <li >
                            <div className="relative flex items-center gap-x-6 border border-gray-500 bg-white shadow-md ">
                                <div className='m-4 mt-6 p-2 font-ubuntu '>
                                    <FaHandshake className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' />
                                    <h3 className="text-center text-base font-semibold leading-7  text-gray-900 "> Búsqueda clara y rápida</h3>
                                    <p className="text-sm font-urbanist leading-6 text-gray-700">Pensamos nuestros filtros y mapas para simplificar tu experiencia en nuestro portal.</p>

                                </div>
                            </div>
                        </li>
                        <li >
                            <div className="relative flex items-center gap-x-6 border border-gray-500 bg-white shadow-md">
                                <div className='m-4 mt-6 p-2 font-ubuntu '>
                                    <BsFillAlarmFill className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' />
                                    <h3 className="text-center text-base font-semibold leading-7  text-gray-900">Tienes tu propia sección</h3>
                                    <p className="text-sm font-urbanist leading-6 text-gray-700">Accede de forma fácil y segura a los avisos contactados, favoritos, las notas que creaste y más.</p>
                                    <div className="">

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li >
                            <div className="relative flex items-center gap-x-6 border border-gray-500 bg-white shadow-md">
                                <div className='m-4 mt-6 p-2 font-ubuntu '>
                                    <HiHome className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' />
                                    <h3 className="text-center text-base font-semibold leading-7  text-gray-900">Variedad de anunciantes</h3>
                                    <p className="text-sm font-urbanist leading-6 text-gray-700">Inmobiliarias y dueños directos de todo el país ofrecen las mejores opciones de inmuebles para ti.</p>
                                    <div className="">

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li >
                            <div className="relative flex items-center gap-x-6 border border-gray-500 bg-white shadow-md">
                                <div className='m-4 mt-6 p-2 font-ubuntu '>
                                    <FaHouseUser className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' />
                                    <h3 className="text-center text-base font-semibold leading-7  text-gray-900">¡CasaPaz!</h3>
                                    <p className="text-sm font-urbanist leading-6 text-gray-700">14 años en el mercado y 1.3 millones de avisos publicados nos respaldan en la búsqueda de tu hogar.</p>
                                    <div className="">

                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards2