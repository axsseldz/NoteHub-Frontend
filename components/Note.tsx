'use client'

import Link from 'next/link';
import { MdDeleteForever } from 'react-icons/md'
import React, { useContext } from 'react'
import { getNotes } from './Notes';
import { GlobalContext } from './Notes';


const deleteNote = async (id: any) => {
    try {
        const response = await fetch(`http://localhost:5123/api/TodoList/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

type PageProps = {
    id: any
}

export default function Note({ id }: PageProps) {
    const { setData } = useContext(GlobalContext)

    const handleClick = async () => {
        await deleteNote(id);
        const secondResponse = await getNotes()
        setData(secondResponse)
    };

    return (
        <Link href="/Notes">
            <div onClick={handleClick} className='hover:bg-red-600 hover:text-white text-red-600 rounded-full p-1'>
                <MdDeleteForever className='text-2xl cursor-pointer' />
            </div>
        </Link>
    )
}
