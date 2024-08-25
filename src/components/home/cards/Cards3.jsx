import React from 'react'

function Cards3() {
    return (
        <div>
            <div>
                <div className="mx-auto grid max-w-7xl px-3 lg:grid-cols-4 m-3 sm:grid-cols-2">
                    <div className="flex justify-center items-center gap-x-3 border-r border-gray-400">
                        <div className='m-4 p-2 font-ubuntu '>
                            {/* <FaHandshake className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' /> */}
                            <h3 className="text-[50px] font-semibold leading-7  text-gray-900 "> + 100</h3>
                            <p className="text-sm font-extralight font-ubuntu  leading-6 text-gray-700 mt-3 flex justify-center"> propiedades</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-3 border-r border-gray-400">
                        <div className='m-4 p-2 font-ubuntu '>
                            {/* <BsFillAlarmFill className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' /> */}
                            <h3 className="text-[50px] font-semibold leading-7  text-gray-900">+ 50</h3>
                            <p className="text-sm font-semibold leading-6 text-gray-700 mt-3 flex justify-center">colaboradores.</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-3 border-r border-gray-400">
                        <div className='m-4 p-2 font-ubuntu '>
                            {/* <HiHome className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' /> */}
                            <h3 className="text-[50px] font-semibold leading-7  text-gray-900">100 %</h3>
                            <p className="text-sm font-semibold leading-6 text-gray-700 mt-3 flex justify-center">venta y compra segura</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-3 ">
                        <div className='m-4 p-2 font-ubuntu '>
                            {/* <FaHouseUser className='bg-white absolute h-16 w-16 rounded-full m-3 justify-center flex text-green-500 text-3xl p-4 shadow-md right-[35%] top-[-40px] pl-2 pr-2 ' /> */}
                            <h3 className="text-[50px] font-semibold leading-7  text-gray-900">+ 1000</h3>
                            <p className="text-sm font-semibold leading-6 text-gray-700 mt-3 flex justify-center">visitas diarias</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards3