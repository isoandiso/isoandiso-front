import React, { useEffect, useState } from 'react'
import { TbDeviceIpadSearch } from "react-icons/tb"
import { SlRocket } from "react-icons/sl"
import { FaHouseUser } from "react-icons/fa"
import isoImage from '/public/img/iso.webp';
import { GiBullseye } from "react-icons/gi";

const Us = () => {

    const properties = [
        {
            id: 1,
            href: '/item',
            imageSrc: '/public/img/daniel.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'líder UX/UI',
            name: 'Daniel Mena ',
            buttonColor: 'bg-red-500'
        },
        {
            id: 2,
            href: '/item',
            imageSrc: '/public/img/back.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Líder Desarrollador Backend',
            name: 'Jackson Quintero',
            buttonColor: 'bg-red-500'
        },
    ]
    return (
        <div className='sm:px-4 lg:px-6'>
            <h1 className='text-[40px] font-bold font-ubuntu'>Nosotros</h1>
            <div>
                <div>
                    <section
                        className="relative bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${isoImage})` }}                    >
                        <div
                            className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                        ></div>

                        <div
                            className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                        >
                            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right font-ubuntu">
                                <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                                    Somos

                                    {/* <strong className="block font-extrabold text-rose-700"> Forever Home. </strong> */}
                                </h1>

                                <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white">
                                    una empresa de integración de tecnología y somos expertos en ayudar a digitalizar sistemas operativos según estándares ISO. También nos encargamos de dar seguimiento a las empresas interesadas durante todo el proceso de digitalización
                                </p>


                            </div>
                        </div>
                    </section>
                </div>
                <br />
                <br />
                <div className="max-w-5xl mx-auto w-11/12">
                    <ul role="list" className="grid gap-8 sm:grid-cols-2 sm:gap-5 md:gap-10 border-gray-300">
                        <li >
                            <div className="flex items-center gap-x-6 sm:gap-x-2 md:gap-x-6 border border-gray-500 bg-white shadow-lg">
                                <div className='rounded-full ml-2 px-3 py-[13px] bg-gray-300'>
                                    <GiBullseye className='text-3xl w-15' />
                                </div>
                                <div className=''>
                                    <h3 className="text-center text-3xl font-semibold leading-7  text-gray-900 font-ubuntu my-2"> Misión</h3>
                                    <p className="text-sm font-medium font-urbanist leading-6 text-gray-700 my-2">Somos Empresa del Sector Tecnológico especializado en Normas ISO (Seguridad y Salud en el Trabajo, Medio ambiente y Calidad) que ofrece un sistema digital e integral y con un equipo de trabajo respetuoso de la ley y de las normas ISO de seguridad, además de estar orientados en la innovación continua.</p>
                                </div>
                            </div>
                        </li>
                        <li >
                            <div className="flex items-center gap-x-6 sm:gap-x-2 md:gap-x-6 border border-gray-500 bg-white shadow-md">
                                <div className='rounded-full ml-2 px-3 py-[13px] bg-gray-300'>
                                    <SlRocket className='text-3xl w-15' />
                                </div>
                                <div className=''>
                                    <h3 className="text-center text-3xl font-semibold leading-7 text-gray-900 font-ubuntu  my-2"> Visón</h3>
                                    <p className="text-sm font-medium font-urbanist leading-6 text-gray-700 my-2">Ser una empresa reconocida por su calidad y desarrollo en el Sistema Digital en base a las Normas ISO que da como resultado la eficiencia de resultados inmediatos y analisis de datos.</p>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
                <br className='' />
                <div className='m-4'>
                    <h1 className='font-ubuntu font-bold text-center text-3xl'>Nuestros equipo</h1>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 rounded-md ">
                        {properties.map((product) => (
                            <div key={product.id} className="group relative shadow-lg">
                                <div className=''>
                                    <div className="w-full overflow-hidden  bg-gray-200 lg:h-80 sm:h-60 ">
                                        <a href={product.href}>
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center md:h-auto md:w-full lg:h-full lg:w-full  inset-0 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                            />

                                        </a>
                                        {/* <FaRegHeart className="bg-white absolute top-5 right-2 py-1 px-3 rounded-full text-black text-[40px]" /> */}
                                        {/* <span className="bg-[#DC3545] absolute top-5 right-2 py-1 px-3 rounded-full text-white text-[10px]" >ID: {product.id}</span>
                                            <span className="bg-blue-800 absolute text-end bottom-36 right-2 py-1 px-3 rounded-full text-white text-[10px]" >{product.type}</span> */}
                                    </div>
                                </div>
                                <div className='bg-white p-2 font-urbanist'>
                                    <div className="mt-3 ">
                                        <div className='ml-3 text-center'>
                                            <div>
                                                <p className="text-sm justify-center font-medium text-gray-700 mb-2 ">{product.title}</p>
                                            </div>
                                            <div className='flex justify-center'>
                                                <p className='text-[20px] text- text-center font-bold'> {product.name}</p>
                                            </div>
                                            <h3 className="text-sm text-gray-600 flex">
                                                {product.locate}
                                            </h3>
                                            {/* <button className={`${product.buttonColor} text-white p-2 rounded-md`}>Conocer más</button> */}
                                        </div>
                                    </div>
                                    {/* <span className="bg-[#DC3545] absolute top-5 right-2 py-1 px-3 rounded-full text-white text-[10px]" >ID: {product.id}</span>
                                            <span className="bg-blue-800 absolute text-end bottom-36 right-2 py-1 px-3 rounded-full text-white text-[10px]" >{product.type}</span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Us