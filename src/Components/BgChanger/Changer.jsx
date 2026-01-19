import React, {useState} from 'react'

function Changer() {
    const [value, setValue] = useState("lightseagreen");

    const colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];

    return (
        <div className='flex flex-col items-center justify-center p-4 m-2 min-h-screen bg-gray-50'>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Background Changer</h1>
            <div 
                className='w-full max-w-4xl h-[500px] rounded-2xl flex justify-center items-center shadow-xl transition-colors duration-500 border border-gray-200' 
                style={{ backgroundColor: value }}
            >
                <div className='w-full max-w-3xl flex flex-wrap justify-center items-center gap-4 p-4'>
                    {colors.map(color => (
                        <button 
                            key={color}
                            onClick={() => setValue(color)}
                            className="bg-white/80 hover:bg-white text-gray-800 font-bold py-3 px-6 rounded-xl shadow-md capitalize backdrop-blur-sm transition-all transform hover:scale-105"
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Changer