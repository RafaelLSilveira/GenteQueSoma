import React, { useState, useEffect, Fragment } from 'react'
import ListItems from '../Components/ListItems'
import useInput from '../Hooks/useInput'
import AddIcon from '@material-ui/icons/Add'
import { Button, Grid, TextField, List, Typography } from '@material-ui/core'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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
      store.addNotification({
        title: "Ocorreu um Erro",
        message: "Não é possível adicionar um item vazio!",
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
    }
  }

  const handleDelete = (id) => {
    const newItems = listNames.filter(item => item.id !== id)

    setListNames(newItems)
  }

  const handleComplete = (id) => {
    const newItems = listNames.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })

    setListNames(newItems)
  }

  return (
    <Fragment>
      <ReactNotification />
      <div className="content">
        <Typography className="title" variant="h3">Minha Lista de Tarefas</Typography>
        <br /><br/>
        <Grid container>
          <Grid  height={30}  item lg={8}>
          <TextField 
            className="nameInput"
            label="Item"
            variant="outlined"
            placeholder="Insira sua tarefa aqui"
            onChange={name.onChange}
            value={name.value}
          />
          </Grid>
          <Grid item lg={4}>
            <Button 
              className="button"
              variant="contained"
              color="primary"
              onClick={handleAdd}
              startIcon={<AddIcon />}>
                Adicionar
            </Button>
          </Grid>
        </Grid>
        <List component="nav" className="list">
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
      </List>
      <Typography variant="subtitle2"> Nº de Registros: {listCount}</Typography>
    </div>
  </Fragment>
  )
}

export default Application