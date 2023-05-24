'use client'

import React, { useState, useContext } from 'react'
import { SiMicrosoftonenote } from 'react-icons/si'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { GlobalContext } from '@/components/Notes'
import { getNotes } from '@/components/Notes'


export default function Page() {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [emptyField, setEmptyField] = useState<boolean>(false);

    const { setData } = useContext(GlobalContext)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (title === "" || content === "") {
            setEmptyField(true)
            return
        }


        // Create New Note API Request
        const response = await fetch("http://localhost:5123/api/TodoList", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `${title}`,
                content: `${content}`
            })
        });

        const data = await response.json();
        console.log(data);

        const secondResponse = await getNotes()
        setData(secondResponse)

        setTitle("")
        setContent("")

    }

    return (
        <div className='min-w-[748px]'>
            <div className='hover:shadow-xl bg-light-green rounded-md w-[650px] h-100 mx-auto mt-14'>
                <div className='flex items-center justify-start space-x-2 h-14 p-2 m-2'>
                    <div className='bg-custom-yellow text-white flex items-center justify-center w-12 rounded-full p-1'>
                        <SiMicrosoftonenote className='text-2xl' />
                    </div>
                    <h1 className='text-xl text-white'>Create a new note</h1>
                </div>
                {emptyField && (
                    <div className='bg-red-100 rounded-md p-2 mx-5 flex justify-center'>
                        <h1 className='text-red-600'>Please ensure that all fields are filled in.</h1>
                    </div>
                )}
                <form className='flex flex-col p-4 space-y-5 w-[650px] h-80 mt-8' onSubmit={e => handleSubmit(e)} >

                    <div className='p-2 w-100 flex items-center space-x-1'>
                        <div className='min-w-[80px]'>
                            <p className='text-lg text-white'>Title:</p>
                        </div>
                        <input
                            className="flex-1 h-10 rounded-sm outline-none bg-dark-green p-2 text-gray-300"
                            placeholder="Add title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>


                    <div className='p-2 w-100 flex items-center space-x-1'>
                        <div className='min-w-[80px]'>
                            <p className='text-lg text-white'>Content:</p>
                        </div>
                        <input
                            className="flex-1 h-10 rounded-sm outline-none bg-dark-green p-2 text-gray-300"
                            placeholder="Add content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>

                    <button className='bg-custom-yellow h-10 mx-2 rounded-full flex items-center justify-center' type='submit'>
                        <BsFillSendCheckFill className='text-white text-xl' />
                    </button>
                </form>
            </div>
        </div>
    )
}
