import { DiUnitySmall } from 'react-icons/di'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative">
      <DiUnitySmall className='absolute left-[225px] text-gray-300 text-[700px]' />
      <h1 className='absolute top-[650px] left-[620px] text-gray-300 text-3xl'>NoteHub®</h1>
    </main>
  )
}
