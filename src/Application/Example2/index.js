import React, { useState, useEffect }  from 'react'
import ListItems from '../../Components/ListItems'
import './styles.css'

function Example2() {
  const listDefault = [
    {id: 1, title: 'Comprar pão', completed: false},
    {id: 2, title: 'Aprender React', completed:true}
  ]
  const [id, setId] = useState(2)
  const [name, setName] = useState('')
  const [listNames, setListNames] = useState(listDefault)

  // componentDidMount
  useEffect(() => {
    console.warn("Documento foi iniciado.")
  }, [])

  // Functions
  const handleAdd = () => {   
    const newItem = {
      id: id + 1,
      title: name,
      completed: false
    }

    setListNames(...listNames, newItem)
    setName('')
    setId(id + 1)
  }

  const handleDelete = (id) =>  {
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
    <div>
      <h3 className="title">Minha lista de tarefas</h3>
      <input type="text" value={name} onChange={() => setName} />
      <button className="button" onClick={() => handleAdd}>Adicionar</button>
      <ul className="list">
        {
          listNames.map((item) => {
            return (
              <ListItems
                item={item}
                handleDelete={() => handleDelete} 
                handleComplete={() => handleComplete}
              />
          )})
        }
      </ul>
    </div>
  )
}

export default Example2