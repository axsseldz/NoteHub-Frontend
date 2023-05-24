import transformDateTime from "@/functions/DateTime";

type PageProps = {
    data: any
}

export default function SingleNote({ data }: PageProps) {
    const content = data.content.length > 35 ? `${data.content.substring(0, 35)}...` : data.content;
    const title = data.title.length > 15 ? `${data.title.substring(0, 15)}...` : data.title;
    const dateAndHour = transformDateTime(data.createdDate)

    return (
        <div className="flex flex-col justify-center h-24 border pl-10 p-3 space-y-2 hover:bg-white">
            <div className="flex justify-between">
                <h1 className="text-xl">{title}</h1>
                <p className="text-sm text-gray-400">{dateAndHour}</p>
            </div>
            <p className="text-gray-400">{content}</p>
        </div>
    )
}
