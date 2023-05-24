


export default async function getData(id) {
    const timestamp = Date.now();
    const url = `http://localhost:5123/api/TodoList/${id}?timestamp=${encodeURIComponent(timestamp)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data

}