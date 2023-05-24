'use client'

import React, { useState, useEffect, useContext } from 'react'
import { BsFillFileEarmarkRichtextFill, BsFillSendCheckFill } from 'react-icons/bs'
import { MdDateRange, MdEditDocument } from 'react-icons/md'
import Note from './Note'
import { GlobalContext } from './Notes'
import { getNotes } from './Notes'
import getData from '@/API/Requests'

const editNote = async (title: any, content: any, id: any) => {
    try {
        const response = await fetch(`http://localhost:5123/api/TodoList?timestamp=' + Date.now()`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: `${id}`,
                title: `${title}`,
                content: `${content}`
            })
        });

        const data = await response.json();
        console.log(data.data);
        return data.data
    } catch (error) {
        console.error(error);
    }

}

type PageProps = {
    data: any
    date: any
    id: any
    setNoteData: any
}

export default function FullNote({ data, date, id, setNoteData }: PageProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(data.title);
    const [content, setContent] = useState<string>(data.content);
    const [editedData, setEditedData] = useState<any>(data);
    const [emptyField, setEmptyField] = useState<boolean>(false);

    const { setData } = useContext(GlobalContext)

    useEffect(() => {
        setTitle(data.title);
        setContent(data.content);
        setEditedData(data);
    }, [data]);

    const handleClick = () => {
        setEdit(!edit)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (title === "" || content === "") {
            setEmptyField(true)
            return
        }

        await editNote(title, content, id)

        const response = await getNotes()
        setData(response)

        const secondResponse = await getData(id)
        setNoteData(secondResponse)


        setTitle("")
        setContent("")
        setEdit(false)
    }



    return (
        <div>
            {edit ?
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='flex flex-col space-y-2 p-3'>
                        <div className='flex items-center justify-between py-2'>
                            <input
                                className='text-2xl h-8 w-52 py-1 outline-none rounded-md'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <div className='flex items-center space-x-2'>
                                <div className='flex space-x-2 items-center justify-center'>
                                    {edit && <p className='text-green-600 text-sm'>Editing...</p>}
                                    <div onClick={handleClick} className={` ${edit ? 'bg-green-600 text-white' : 'text-green-600'} hover:bg-green-600 hover:text-white rounded-full p-1`}>
                                        <MdEditDocument className='text-xl cursor-pointer' />
                                    </div>
                                </div>
                                <Note id={id} />
                            </div>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <MdDateRange className='text-lg' />
                            <p className='text-sm text-gray-400'>{date}</p>
                        </div>
                    </div>
                    {emptyField && (
                        <div className='bg-red-100 rounded-md p-2 flex justify-center'>
                            <h1 className='text-red-600'>Please ensure that all fields are filled in.</h1>
                        </div>
                    )}
                    <div className='flex flex-col  space-y-4 bg-light-green rounded-md p-3 mt-4'>
                        <div className='flex justify-between'>
                            <div className='bg-custom-yellow text-white flex items-center justify-center w-7 rounded-full p-1'>
                                <BsFillFileEarmarkRichtextFill className='text-xl' />
                            </div>

                        </div>
                        <input
                            className='bg-light-green text-white h-6 flex-1 px-2 outline-none rounded-md'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <button className='hover:h-12 hover:w-56 bg-custom-yellow h-10 w-52 mx-auto my-5 rounded-full flex items-center justify-center' type='submit'>
                        <BsFillSendCheckFill className='text-white text-xl' />
                    </button>
                </form>

                :

                <div>
                    <div className='flex flex-col space-y-2 p-3'>
                        <div className='flex items-center justify-between py-2'>
                            <h1 className='text-2xl'>{editedData.title}</h1>
                            <div className='flex items-center space-x-2'>
                                <div onClick={handleClick} className='hover:bg-green-600 hover:text-white text-green-600 rounded-full p-1'>
                                    <MdEditDocument className='text-xl cursor-pointer' />
                                </div>
                                <Note id={id} />
                            </div>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <MdDateRange className='text-lg' />
                            <p className='text-sm text-gray-400'>{date}</p>
                        </div>
                    </div>
                    <div className='flex flex-col  space-y-4 bg-light-green rounded-md p-3 mt-4'>
                        <div className='flex justify-between'>
                            <div className='bg-custom-yellow text-white flex items-center justify-center w-7 rounded-full p-1'>
                                <BsFillFileEarmarkRichtextFill className='text-xl' />
                            </div>

                        </div>
                        <div className='text-white px-2'>{editedData.content}</div>
                    </div>
                </div>
            }
        </div>
    )
}
