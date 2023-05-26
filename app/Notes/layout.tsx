import React from 'react'
import Notes from "@/components/Notes";

export default async function NotesLayout({ children }: { children: React.ReactNode; }) {

    return (
        <section className="flex">
            <Notes child={children} />
        </section>
    );
}