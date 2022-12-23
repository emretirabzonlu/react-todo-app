import React, { useState } from "react";
import './App.css';

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editButonunaBasildiMi, seteditButonunaBasildiMi] = useState(false);
  const [guncellenecekText, setGuncellenecekText] = useState("")
  const [guncellenecekTodo, setGuncellenecekTodo] = useState(null)




  const handleSubmit = (event) => {
    event.preventDefault()
    if (todoText === "") {
      alert("Please type your todo!")
      return
    }
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false
    }

    setTodos([...todos, newTodo])
    setTodoText("")
  }
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((i) => i.id !== id);
    setTodos(filteredTodos);
  }

  const changeHasDone = (todo) => {
    console.log(todo)
    let tempTodos = []
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        let updatedTodo = {
          ...todo,
          hasDone: !todo.hasDone
        }
        tempTodos.push(updatedTodo)

      } else {
        tempTodos.push(todos[i])
      }
    }
    setTodos(tempTodos)
  };

  const todoGuncelle = (event) => {
    event.preventDefault()
    if(guncellenecekText === ""){
      alert("Todo Text can't be empty")
      return
    }
    let tempTodos=[]
    todos.map(item => {
      if(item.id === guncellenecekTodo.id){
        let updatedTodo={
          ...guncellenecekTodo.id,
          title: guncellenecekText
        }
        tempTodos.push(updatedTodo)

      }else
      {tempTodos.push(item)

      }
    })

    setTodos(tempTodos)
    seteditButonunaBasildiMi(false)

  }

  return (
    <div id="emre" className="container my-5">
      <h1 style={{fontSize:"35px"}} className="d-flex justify-content-center my-4">What's the Plan for Today?</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input style={{border:"2px solid #5d0cff",outline:"none",background:"transparent", color:"white"}}
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="Type your to do..."
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            ADD
          </button>
        </div>
      </form>

      {editButonunaBasildiMi === true && (
        <form onSubmit={todoGuncelle}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={guncellenecekText}
              onChange={(event) => {
                setGuncellenecekText(event.target.value)
              }}

            />

            <button type="submit" className="btn btn-info w-25">Save</button>
            <button onClick={() => {
              seteditButonunaBasildiMi(false)
              
            }} type="button" className="btn btn-danger w-25">Cancel</button>
          </div>
        </form>
      )}



      <div className="container">
        {
          todos.length === 0 ? (
            <p>You don't have any todos yet.</p>
          ) : (
            <>
              {
                todos.map((item, index) => (
                  <div id="emre2" key={index} style={{ borderBottom: "2px solid gray" }} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 style={{ textDecoration: item.hasDone ? "line-through" : "none" }} key={index}>{item.title}
                      </h3>
                      <small>{new Date(item.date).toLocaleString()}</small>
                    </div>
                    <div id="buttons">
                      <button id="b1" onClick={() => { deleteTodo(item.id) }} className="btn btn-sm  mx-1">Delete</button>
                      <button id="b2" onClick={() => {
                        seteditButonunaBasildiMi(true);
                        setGuncellenecekText(item.title)
                        setGuncellenecekTodo(item)
                      }}
                        className="btn btn-sm btn-secondary mx-1">Edit</button>
                      <button id="b3" onClick={() => { changeHasDone(item) }} className="btn btn-sm btn-success mx-1">{item.hasDone === false ? "done" : "undone"}</button>
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;
