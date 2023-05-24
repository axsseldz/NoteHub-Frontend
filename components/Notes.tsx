'use client'

import { FaSort } from 'react-icons/fa'
import { AiFillPlusCircle } from 'react-icons/ai'
import SingleNote from './SingleNote';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export const GlobalContext = React.createContext<any>("")


export const getNotes = async () => {
    const response = await fetch('http://localhost:5123/api/TodoList/GetAll?timestamp=' + Date.now());
    const data = await response.json();
    return data.data
}

type PageProps = {
    child: any
}


export default function Notes({ child }: PageProps) {
    const [sort, setSort] = useState<boolean>(false)
    const [data, setData] = useState<any>([])

    useEffect(() => {
        const getData = async () => {
            const response = await getNotes()
            setData(response)
        }
        getData()
    }, [])

    const handleClick = () => {
        setSort(!sort)

    }

    if (sort) {
        data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdDate).getTime();
            const dateB = new Date(b.createdDate).getTime();
            return dateB - dateA;
        });
    } else {
        data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdDate).getTime();
            const dateB = new Date(b.createdDate).getTime();
            return dateA - dateB;
        });
    }


    return (
        <GlobalContext.Provider value={{ data, setData }}>
            <div className="bg-white-dusk border min-w-[435px] h-screen pb-5 pt-10">
                <div className='flex justify-between p-6 h-24'>
                    <h1 className='text-2xl'>All Notes</h1>
                    <div className='flex space-x-2 relative'>
                        <div onClick={handleClick} className='flex'>
                            {sort && (
                                <p className='absolute right-[33px] top-[5px] text-sm text-green-500'>Sorted</p>
                            )}
                            <FaSort className={`text-3xl text-light-gray hover:text-green-500 ${sort && 'text-green-500'}`} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col h-4/6 overflow-y-auto'>
                    {data.map((note: any) => (
                        <Link key={note.id} href={`/Notes/${note.id}`}>
                            <SingleNote key={note.id} data={note} />
                        </Link>
                    ))}
                </div>
                <Link href="/Notes/Add">
                    <div className='h-20 flex items-center space-x-2 justify-center border-4 border-dashed rounded-md m-10 mt-10 p-5 cursor-pointer hover:shadow-lg'>
                        <AiFillPlusCircle className='icon' />
                        <p>Add New Note</p>
                    </div>
                </Link>
            </div>
            {child}
        </GlobalContext.Provider>
    )
}
