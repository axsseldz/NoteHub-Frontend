import { DiUikit } from 'react-icons/di'

export default function page() {
    return (
        <div className='flex relative w-[750px]'>
            <DiUikit className='absolute left-[40px] text-gray-300 text-[700px]' />
            <h1 className='absolute top-[330px] left-[320px] text-gray-300 text-3xl'>NoteHub®</h1>
        </div>
    )
}
