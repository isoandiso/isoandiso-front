import React from 'react'
import { TbDeviceIpadSearch } from "react-icons/tb"
import { SlRocket } from "react-icons/sl"
import { FaHouseUser } from "react-icons/fa"

function Cards1() {
    return (
        <div className="max-w-5xl mx-auto w-11/12">
            <ul role="list" className="grid gap-8 sm:grid-cols-3 sm:gap-5 md:gap-10 border-gray-300">
                <li >
                    <div className="flex items-center gap-x-6 sm:gap-x-2 md:gap-x-6 border border-gray-500 bg-white shadow-lg">
                        <div className='rounded-full ml-2 px-3 py-[13px] bg-gray-300'>
                            <TbDeviceIpadSearch className='text-3xl w-15' />
                        </div>
                        <div className=''>
                            <h3 className="text-center text-base font-semibold leading-7  text-gray-900 font-ubuntu  my-2"> Sección exclusiva de proyectos</h3>
                            <p className="text-sm font-medium font-urbanist leading-6 text-gray-700 my-2">Una búsqueda ágil y sencilla con ayuda de inteligencia articial.</p>
                        </div>
                    </div>
                </li>
                <li >
                    <div className="flex items-center gap-x-6 sm:gap-x-2 md:gap-x-6 border border-gray-500 bg-white shadow-md">
                        <div className='rounded-full ml-2 px-3 py-[13px] bg-gray-300'>
                            <SlRocket className='text-3xl w-15' />
                        </div>
                        <div className=''>
                            <h3 className="text-center text-base font-semibold leading-7 text-gray-900 font-ubuntu  my-2"> Publica hoy</h3>
                            <p className="text-sm font-medium font-urbanist leading-6 text-gray-700 my-2">Accede a la información de los planes que pensamos para ti.</p>
                        </div>
                    </div>
                </li>
                <li >
                    <div className="flex items-center gap-x-6 sm:gap-x-2 md:gap-x-6 border border-gray-500 bg-white shadow-lg ">
                        <div className='rounded-full ml-2 px-3 py-[13px] bg-gray-300'>
                            <FaHouseUser className='text-4xl w-15' />
                        </div>
                        <div className=''>
                            <h3 className="text-center text-base font-semibold leading-7  text-gray-900 font-ubuntu  my-2 ">Conoce Iso and Iso</h3>
                            <p className="text-sm font-medium font-urbanist leading-6 text-gray-700 my-2">Accede a la información de los planes que pensamos para ti.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Cards1