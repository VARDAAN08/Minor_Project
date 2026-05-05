'use client'

import React, { useState } from 'react'
import MinusOneFloor from "../../components/MinusOneFloor"
import FloorGround from "../../components/FloorGround"
import FirstFloor from "../../components/firstfloor"
import SecondFloor from "../../components/SecondFloor"
import ThirdFloor from "../../components/thirdfloor"
import FourthFloor from "../../components/fourthfloor"

import { useRouter } from 'next/navigation'
import { LogOut, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function Page() {
  const [floor, setFloor] = useState<'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth'>('ground')
  const router = useRouter()
  
  const { data: session, isLoading } = useSWR('/api/auth/session', fetcher)
  const isAuthenticated = session?.authenticated

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        toast.success('Logged out successfully')
        mutate('/api/auth/session')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <>
    <div className='h-screen w-screen flex flex-col bg-neutral-950'>
      
      {/* Top Navigation Bar */}
      <div className='flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800 text-white shadow-lg relative z-50'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20'>E</div>
          <div className='text-xl font-bold tracking-tight'>
            Edu<span className='text-amber-500'>Nav</span> 
            <span className='hidden md:inline text-sm font-normal text-neutral-500 ml-3 border-l border-neutral-800 pl-3'>JUIT Campus Map</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Signed in as</div>
                <div className="text-sm font-semibold text-neutral-200">{session?.user?.email}</div>
              </div>
              <button 
                onClick={handleLogout}
                className='flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-neutral-700 hover:border-neutral-600 shadow-md active:scale-95'
              >
                <LogOut className='h-4 w-4 text-amber-500' />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className='flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95'
            >
              <LogIn className='h-4 w-4' />
              <span>Login to Book</span>
            </button>
          )}
        </div>
      </div>

      {/* Floor Selector */}
      <div className='p-3 flex gap-2 justify-center bg-neutral-900 border-b border-neutral-800 overflow-x-auto'>

        {/* -1 Floor */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'minus1' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('minus1')}
        >
          -1 Floor
        </button>

        {/* Ground Floor (0) */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'ground' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('ground')}
        >
          Ground
        </button>

        {/* 1st Floor */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'first' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('first')}
        >
          1st Floor
        </button>

        {/* 2nd Floor */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'second' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('second')}
        >
          2nd Floor
        </button>

        {/* 3rd Floor */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'third' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('third')}
        >
          3rd Floor
        </button>

        {/* 4th Floor */}
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${floor === 'fourth' ? 'bg-amber-500 text-black shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
          onClick={() => setFloor('fourth')}
        >
          4th Floor
        </button>

      </div>

      {/* Floor Display */}
      <div className='flex-1 overflow-y-auto relative custom-scrollbar'>
        <div className='absolute inset-0 bg-neutral-950 z-0' />
        <div className='relative z-10 w-full min-h-full pb-12'>
          {floor === 'minus1' && <MinusOneFloor setFloor={setFloor} />}
          {floor === 'ground' && <FloorGround setFloor={setFloor} />}
          {floor === 'first' && <FirstFloor setFloor={setFloor} />}
          {floor === 'second' && <SecondFloor setFloor={setFloor} />}
          {floor === 'third' && <ThirdFloor setFloor={setFloor} />}
          {floor === 'fourth' && <FourthFloor setFloor={setFloor} />}
        </div>
      </div>
    </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.4);
        }
      `}</style>
    </>
  )
}

export default Page