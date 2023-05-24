'use client'

import { AiFillCaretDown, AiOutlineBold, AiOutlineUnderline, AiOutlineUpload } from 'react-icons/ai'
import { BsJustifyLeft, BsJustifyRight, BsReverseListColumnsReverse } from 'react-icons/bs'
import { CiBoxList } from 'react-icons/ci'
import transformDateTime from '@/functions/DateTime'
import FullNote from '@/components/FullNote'
import React, { useState, useEffect } from 'react'
import getData from '../../../API/Requests'


type PageProps = {
    params: {
        noteId: string
    }
}

export default function NotePage({ params: { noteId } }: PageProps) {
    const [noteData, setNoteData] = useState<any>([])

    useEffect(() => {
        const getD = async () => {
            const response = await getData(noteId)
            setNoteData(response)
            setNoteData((noteData: { createdDate: any }) => ({
                ...noteData,
                createdDate: transformDateTime(noteData.createdDate)
            }));
        }
        getD()
    }, [noteId])


    return (
        <div className="min-w-[748px]">
            <div className="w-[650px] h-100 mx-auto mt-14">
                <div className="flex items-center justify-start p-3 w-[100%] space-x-4 border-b-2">
                    <div className="flex items-center justify-center space-x-1">
                        <p>25</p>
                        <AiFillCaretDown className='text-sm text-gray-300' />
                    </div>
                    <p className='text-gray-300 text-2xl'>|</p>

                    <AiOutlineBold className='text-lg' />

                    <AiOutlineUnderline className='text-lg' />

                    <p className='text-gray-300 text-2xl'>|</p>

                    <BsJustifyLeft className='text-lg' />

                    <BsJustifyRight className='text-lg' />

                    <div className="flex items-center justify-center space-x-1">
                        <BsReverseListColumnsReverse className='text-lg' />
                        <AiFillCaretDown className='text-sm text-gray-300' />
                    </div>

                    <p className='text-gray-300 text-2xl'>|</p>

                    <CiBoxList className='text-lg' />

                    <AiOutlineUpload className='text-lg' />
                </div>
                <FullNote data={noteData} date={noteData.createdDate} id={noteId} setNoteData={setNoteData} />
            </div>
        </div>
    )
}

