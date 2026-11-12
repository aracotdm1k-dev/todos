import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Posts() {
    const { id } = useParams()
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            let res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
            let data = await res.json()
            setTodos(data)
            console.log(data);
        }

        getPosts()
    }, [id])

    return (
        <>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </>
    )
}

export default Posts