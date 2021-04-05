import React, { useState, useEffect } from 'react'
import useInput from '../Hooks/useInput'
import { MdCancel, MdCheck } from 'react-icons/md'

import './styles.css'

function Application() {
  const [id, setId] = useState(3)
  const name = useInput()
  const [listCount, setListCount] = useState(3)
  const [listNames, setListNames] = useState(() => {
    const initialState = [
      { id: 1, title: 'Aprender React', completed: false },
      { id: 2, title: 'Aprender Html e Javascript', completed: true }
    ]

    return initialState
  })

  useEffect(() => {
    console.warn('Documento foi iniciado.')
    document.title = 'Lista de Tarefas'
  }, [])

  useEffect(() => {
    setListCount(listNames.length)
  }, [listNames])

  // Functions
  const handleAdd = () => {
    const {
      value,
      onChange
    } = name

    const newItem = {
      id: id + 1,
      title: value,
      completed: false
    }
    if (value) {
      setListNames([...listNames, newItem])
      onChange()
      setId(id + 1)
    } else {
      alert('Não é possível adicionar um item vazio!')
    }
  }

  const handleDelete = (id) => {
    const newItems = listNames.filter(item => item.id !== id)

    setListNames(newItems)
  }

  const handleComplete = (id) => {
    const newItems = listNames.map(item => {
      if (item.id === id) {
        item.completed = true
      }
      return item
    })

    setListNames(newItems)
  }

  return (
    <div className="content">
      <h1 className="title">Minha Lista de Tarefas</h1>
      <input className="nameInput" type="text" placeholder="Insira sua tarefa aqui" {...name} />
      <button className="button" onClick={handleAdd}>Adicionar</button>
      <ul className="list">
        {
          listNames.map((item) => (
            <li key={item.id}>
              <span className={`listTitle ${item.completed ? 'listItemCompleted' : ''}`}>{item.title}</span>
              {
                !item.completed
                  ? <MdCheck className="icon completeIcon" onClick={() => handleComplete(item.id)} />
                  : null
              }
              <MdCancel className="icon cancelIcon" onClick={() => handleDelete(item.id)} />
              <br /><br />
            </li>
          ))
        }
      </ul>
      <label className="count">N° de Registros: {listCount}</label>
    </div>
  )
}

export default Application