import React from 'react'

export default function MatrixItem({todos, name}) {
  return (
    <div>
        <h5>{name}</h5>
      <ol>
        {todos.map((todo, index)=>{
            return (
              <li key={index}>
                <span>{index + 1}) {todo}</span>
              </li>
            )        
        })}
      </ol>
    </div>
  )
}
