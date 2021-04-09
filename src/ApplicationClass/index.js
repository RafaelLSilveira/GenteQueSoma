import React, { Component } from 'react'
import { MdCancel, MdCheck } from 'react-icons/md'
import { head, isEmpty, orderBy } from 'lodash'

import './styles.css'

class ApplicationClass extends Component {
  constructor(props) {
    super(props)
    
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleNameAdd = this.handleNameAdd.bind(this)
    this.getNameOptions = this.getNameOptions.bind(this)

    this.state = {
      id: 3,
      name: '',
      listNamesLoading: false,
      listNames: [
        { id: 2, title: 'Aprender Html e Javascript', completed: true },
        { id: 1, title: 'Aprender React', completed: false }
      ]
    }
  }

  componentDidMount(){
    console.warn('Documento foi iniciado.')
    document.title = 'Lista de Tarefas'

    this.getNameOptions()
  }

  async getNameOptions() {
    try {
      this.setState(prevState => ({
        ...prevState,
        listNamesLoading: true
      }))

      const response =  await fetch('https://jsonplaceholder.typicode.com/todos')
      const listValues = await response.json()
      const listValuesSorted = orderBy(listValues, ['id'], ['desc'])

      this.setState(prevState => ({
        ...prevState,
        listNames: listValuesSorted,
        id: head(listValuesSorted).id
      }))

    } catch (error) {
      throw new Error(error)
    } finally{
      this.setState(prevState => ({
        ...prevState,
        listNamesLoading: false
      }))
    }
  }

  // Functions
  handleAdd(){
    const {
      name,
      id,
      listNames
    } = this.state

    const newItem = {
      id: id + 1,
      title: name,
      completed: false
    }
    if (!isEmpty(name)) {     
      this.setState(prevState => ({
        ...prevState,
        name: '',
        listNames: orderBy([...listNames, newItem], ['id'], ['desc']),
        id: newItem.id
      }))
    } else {
      alert('Não é possível adicionar um item vazio!')
    }
  }

  handleDelete(id){
    const { listNames } = this.state

    const newItems = listNames.filter(item => item.id !== id)

    this.setState(prevState => ({
      ...prevState,
      listNames: newItems
    }))
  }

  handleComplete(id){
    const { listNames } = this.state

    const newItems = listNames.map(item => {
      if (item.id === id) {
        item.completed = true
      }
      return item
    })

    this.setState(prevState => ({
      ...prevState,
      listNames: newItems
    }))
  }

  handleNameAdd(event){
    this.setState(prevState => ({
      ...prevState,
      name: event.target.value
    }))
  }

  render() {
    const {
      listNames,
      listNamesLoading,
      name
    } = this.state

    if(listNamesLoading){
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
        <input className="nameInput" type="text" placeholder="Insira sua tarefa aqui" value={ name } onChange={this.handleNameAdd} />
        <button className="button" onClick={this.handleAdd}>Adicionar</button>
        <div className="listMultiline">
          <ul className="list">
            {
              listNames.map((item) => (
                <li key={item.id}>
                  <span className={`listTitle ${item.completed ? 'listItemCompleted' : ''}`}>{item.title}</span>
                  {
                    !item.completed
                      ? <MdCheck className="icon completeIcon" onClick={() => this.handleComplete(item.id)} />
                      : null
                  }
                  <MdCancel className="icon cancelIcon" onClick={() => this.handleDelete(item.id)} />
                  <br /><br />
                </li>
              ))
            }
          </ul>
        </div>
        <label className="count">N° de Registros: {listNames.length}</label>
      </div>
    )
  }
}

export default ApplicationClass