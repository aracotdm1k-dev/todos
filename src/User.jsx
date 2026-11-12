import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function User() {
    const [todos, setTodos] = useState([]);
    console.log(todos);

    useEffect(() => {
        const getTodos = async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/todos'); 
            let data = await res.json();
            setTodos(data);    
        }
        getTodos();
    }, [])

  return (
    <>
      <ul>
          {todos.map(todo => (
              <Link key={todo.id} to={`/user/${todo.id}`}>
                  <li>{todo.title}</li>
              </Link>
          ))}
      </ul>
    </>
  )
}

export default User 