// import React, { useState, useCallback, useMemo, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import useInput from '../Hooks/useInput'
import { MdCancel, MdCheck } from 'react-icons/md'
import { head, isEmpty, orderBy } from 'lodash'

import './styles.css'

function Application() {
  const [id, setId] = useState(3)
  const [loading, setLoading] = useState(true)
  const name = useInput()
  const [listCount, setListCount] = useState(3)
  const [listNames, setListNames] = useState(() => {
    const initialState = [
      { id: 2, title: 'Aprender Html e Javascript', completed: true },
      { id: 1, title: 'Aprender React', completed: false }
    ]

    return initialState
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getNameOptions = useCallback(async () => {
  //   try {
  //     setLoading(true)

  //     const response =  await fetch('https://jsonplaceholder.typicode.com/todos/')

  //     setListNames(await response.json())
  //   } catch(error) {
  //     throw new Error(error)
  //   } finally{
  //     setLoading(false)
  //   }
  // })

  useEffect(() => {
    console.warn('Documento foi iniciado.')
    document.title = 'Lista de Tarefas'

    const getNameOptions = async () => {
      try {
        setLoading(true)
  
        const response =  await fetch('https://jsonplaceholder.typicode.com/todos/')
        
        const listValues = await response.json()
        const listValuesSorted = orderBy(listValues, ['id'], ['desc'])

        setListNames(listValuesSorted)
        setId(head(listValuesSorted).id)
      } catch(error) {
        throw new Error(error)
      } finally{
        setLoading(false)
      }
    }

    getNameOptions()
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

    if (!isEmpty(value)) {
      setListNames(orderBy([...listNames, newItem], ['id'], ['desc']))
      onChange()
      setId(newItem.id)
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

  if(loading){
    return (
      <div className="content">
      <h1 className="title">Minha Lista de Tarefas</h1>
        <div className="listloader">
        </div>
      </div>
    )
  }

  return (
    <div className="content">
      <h1 className="title">Minha Lista de Tarefas</h1>
      <input className="nameInput" type="text" placeholder="Insira sua tarefa aqui" {...name} />
      <button className="button" onClick={handleAdd}>Adicionar</button>
      <div className="listMultiline">
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
      </div>
      <label className="count">N° de Registros: {listCount}</label>
    </div>
  )
}

export default Application