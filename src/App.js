import { useEffect, useState } from "react";
import MatrixItem from "./components/MatrixItem";

function App() {

  const [todo, setTodo] = useState('')
  const [select, setSelect] = useState('default')
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos ? storedTodos : { ie: [], ine: [], nie: [], nine: []}
  })
  const [color, setColor] = useState(false)
    
  const [randomR, setRandomR] = useState(0);
  const [randomG, setRandomG] = useState(0);
  const [randomB, setRandomB] = useState(0);

  const handleSubmit = e =>{
    e.preventDefault();
    if(select === 'i and e'){
      setTodos(prevTodos => ({
        ...prevTodos,
        ie: [...prevTodos.ie, todo]
      }))    
    }
    else if(select === 'i and ne'){
      setTodos(prevTodos => ({
        ...prevTodos,
        ine: [...prevTodos.ine, todo]
      }))
    }
    if(select === 'ni and e'){
      setTodos(prevTodos => ({
        ...prevTodos,
        nie: [...prevTodos.nie, todo]
      }))
    }
    if(select === 'ni and ne'){
      setTodos(prevTodos => ({
        ...prevTodos,
        nine: [...prevTodos.nine, todo]
      }))
    } 
    setTodo('')
  }
  const handleDeleteData = () =>{
    localStorage.clear();
      setTodos({ie: [], ine: [], nie: [], nine: []})
  }
  useEffect(() => {
    setRandomR(Math.floor(Math.random() * 256));
    setRandomG(Math.floor(Math.random() * 256));
    setRandomB(Math.floor(Math.random() * 256));
  }, [todos])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const toggleColor = () =>{
    setColor(prevColor => !prevColor)
  }
  return (
  <div 
  style={{
    background: 
    color ? `linear-gradient(to left top, rgb(${randomR}, ${randomG}, ${randomB}), 
    rgb(${randomG}, ${randomB}, ${randomR}))`
    : `rgb(${randomR}, ${randomG}, ${randomB})`}}
    className="page">
    <div className="App">
        <form onSubmit={handleSubmit}>
            <input required placeholder="Enter text" value={todo} onChange={e => setTodo(e.target.value)} type="text"/>
            <select required value={select} onChange={e => setSelect(e.target.value)}>
              <option value="default" defaultChecked disabled>Select</option>
              <option value="i and e">Important and urgent</option>
              <option value="i and ne">Important and not urgent</option>
              <option value="ni and e">Not Important and urgent</option>
              <option value="ni and ne">Not Important and not urgent</option>
            </select>
            <button style={{backgroundColor: `rgba(${randomR}, ${randomG}, ${randomB})`}} type="submit" className="btn">Add List</button>
        </form>
        <div className="matrix">
          <MatrixItem todos={todos.ie} name="Important and urgent" />
          <MatrixItem todos={todos.ine} name="Important and not urgent" />
          <MatrixItem todos={todos.nie} name="Not Important and urgent" />
          <MatrixItem todos={todos.nine} name="Not Important and not urgent" />
        </div>
        <button onClick={handleDeleteData} className="btn delete-btn">Clear All List</button>
        <label className="color">
          <span>{color ? 'Static color' : 'Gradient color'}</span>
          <ion-icon onClick={toggleColor} name="contrast-outline"></ion-icon>
        </label>
    </div>
   </div>
  );
}

export default App;
