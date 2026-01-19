import React, {useState} from "react";

function Hero() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [height, setHeight] = useState(0)
  const [power, setPower] = useState('')

  const [display, setDisplay] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Build a Hero</h1>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Age:</label>
            <input type="number" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={e => setAge(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Height:</label>
            <input type="number" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={e => setHeight(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">SuperPower:</label>
            <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={e => setPower(e.target.value)} />
        </div>
      
        <button 
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setDisplay((a) => !a)}
        >
            {display? "Hide Character" : "Display Character"}
        </button>
      </div>

      {display && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg w-full max-w-md border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hero Info</h2>
            <ul className="space-y-2 text-gray-700">
                <li><span className="font-semibold">Name:</span> {name}</li>
                <li><span className="font-semibold">Age:</span> {age}</li>
                <li><span className="font-semibold">Height:</span> {height}</li>
                <li><span className="font-semibold">SuperPower:</span> {power}</li>
            </ul>
        </div>
      )}
    </div>
  );
}

export default Hero;