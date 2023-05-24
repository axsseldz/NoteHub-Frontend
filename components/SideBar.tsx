'use client'

import Image from "next/image";
import Link from "next/link";
import { MdStickyNote2 } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'
import React, { useState } from 'react'


export default function SideBar() {
    const [homeActive, setHomeActive] = useState<boolean>(true);
    const [notesActive, setNotesActive] = useState<boolean>(false);

    const handleClick = (route: any) => {
        if (route === "home") {
            setHomeActive(true)
            setNotesActive(false)

        }
        else if (route === "notes") {
            setNotesActive(true)
            setHomeActive(false)
        }
    }

    return (
        <div className="bg-light-green flex flex-col space-y-10 p-6 pt-7 min-w-fit h-screen">
            <div className="h-28 flex items-center justify-center space-x-3">
                <Image
                    src="https://cdn-icons-png.flaticon.com/512/564/564445.png"
                    alt="icon"
                    priority
                    width={70}
                    height={70}
                />
                <h1 className="font-bold text-white text-3xl">Note<span className="text-custom-yellow">Hub</span></h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Link href="/">
                    <div onClick={() => handleClick("home")} className={`flex p-4 items-center justify-start space-x-2 hover:bg-dark-green rounded-md ${homeActive ? "bg-dark-green" : ""}`}>
                        <FaHome className="icon" />
                        <p className="text-light-gray">Home</p>
                    </div>
                </Link>
                <Link href="/Notes">
                    <div onClick={() => handleClick("notes")} className={`flex p-4 items-center justify-start space-x-2 hover:bg-dark-green rounded-md ${notesActive ? "bg-dark-green" : ""}`}>
                        <MdStickyNote2 className="icon" />
                        <p className="text-light-gray">Notes</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
