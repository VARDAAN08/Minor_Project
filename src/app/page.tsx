'use client'

import React, { useState } from 'react'
import MinusOneFloor from "../../components/MinusOneFloor"
import FloorGround from "../../components/FloorGround"
import FirstFloor from "../../components/firstfloor"
import SecondFloor from "../../components/SecondFloor"
import ThirdFloor from "../../components/thirdfloor"
import FourthFloor from "../../components/fourthfloor"

function Page() {
  const [floor, setFloor] = useState<
    'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth'
  >('ground')

  return (
    <div className='h-screen w-screen flex flex-col'>

      {/* Floor Selector */}
      <div className='p-4 flex gap-2 justify-center bg-white text-black shadow-sm'>

        {/* -1 Floor */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'minus1' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('minus1')}
        >
          -1 Floor
        </button>

        {/* Ground Floor (0) */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'ground' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('ground')}
        >
          Ground
        </button>

        {/* 1st Floor */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'first' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('first')}
        >
          1st Floor
        </button>

        {/* 2nd Floor */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'second' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('second')}
        >
          2nd Floor
        </button>

        {/* 3rd Floor */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'third' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('third')}
        >
          3rd Floor
        </button>

        {/* 4th Floor */}
        <button
          className={`px-3 py-1 rounded ${
            floor === 'fourth' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFloor('fourth')}
        >
          4th Floor
        </button>

      </div>

      {/* Floor Display */}
      <div className='flex-1'>
        {floor === 'minus1' && <MinusOneFloor />}
        {floor === 'ground' && <FloorGround />}
        {floor === 'first' && <FirstFloor />}
        {floor === 'second' && <SecondFloor />}
        {floor === 'third' && <ThirdFloor />}
        {floor === 'fourth' && <FourthFloor />}
      </div>

    </div>
  )
}

export default Page