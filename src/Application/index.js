import React, { useState, useEffect } from 'react'
import ListItems from '../Components/ListItems'
import './styles.css'

function Application() {
  const [id, setId] = useState(3)
  const [name, setName] = useState('')
  const [listCount, setListCount] = useState(3)
  const [listNames, setListNames] = useState(() => {
    const initialState = [
      { id: 1, title: 'Aprender React', completed: false },
      { id: 2, title: 'Aprender Html e Javascript', completed: true }
    ]

    return initialState
  })

  // componentDidMount / componentWillMount
  useEffect(() => {
    console.warn('Documento foi iniciado.')
  }, [])

  // onChangeValue of list
  useEffect(() => {
    setListCount(listNames.length)
  }, [listNames])

  // Functions
  const handleAdd = () => {
    const newItem = {
      id: id + 1,
      title: name,
      completed: false
    }
    if(name) {
      setListNames([...listNames, newItem])
      setName('')
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
      <input className="nameInput" type="text" placeholder="Insira sua tarefa aqui" value={name} onChange={(event) => setName(event.target.value)} />
      <button className="button" onClick={handleAdd}>Adicionar</button>
      <ul className="list">
        {
          listNames.map((item) => {
            return (
              <ListItems
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
              />
            )
          })
        }
      </ul>
      <label className="count">N° de Registros: {listCount}</label>
    </div>
  )
}

export default Application