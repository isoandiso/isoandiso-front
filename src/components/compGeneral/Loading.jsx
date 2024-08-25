import React from 'react'

function Loading() {

    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center h-screen">
            <div className="w-28 h-28 border-8 text-purple-500 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-purple1 rounded-full">
                <img src="/public/img/logoss.png" alt="" className="animate-ping" />
            </div>
        </div>
    )
}

export default Loading