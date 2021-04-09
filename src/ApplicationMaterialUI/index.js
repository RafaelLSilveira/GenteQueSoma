import React, { useState, useEffect, Fragment } from 'react'
import ListItems from '../Components/ListItems'
import useInput from '../Hooks/useInput'
import AddIcon from '@material-ui/icons/Add'
import { Button, Grid, TextField, List, Typography, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { head, isEmpty, orderBy } from 'lodash'

import './styles.css'

function Application() {
  const [id, setId] = useState(3)
  const [loading, setLoading] = useState(true)
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

  if(loading){
    return (
      <Fragment>
        <div className="content">
          <Typography>
            <Skeleton animation="wave" width={600} height={80} />
          </Typography>
            <Grid container>
              <Grid  height={30}  item lg={10}>
              <Skeleton className="nameInput" animation="wave" variant="text" width={500} height={60}/>
              </Grid>
              <Grid item lg={2}>
                <Skeleton animation="wave" variant="text" width={100} height={60}/>
              </Grid>
            </Grid>
            <div>
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
              <Skeleton animation="wave" variant="text" height={40} />
            </div>
            <Skeleton className="count" animation="wave" variant="text" width={100} />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <ReactNotification />
      <div className="content">
        <Typography className="title" variant="h3">Minha Lista de Tarefas</Typography>
        <br /><br/>
        <Grid container>
          <Grid  height={30}  item lg={10}>
          <TextField 
            className="nameInput"
            label="Item"
            variant="outlined"
            placeholder="Insira sua tarefa aqui"
            onChange={name.onChange}
            value={name.value}
          />
          </Grid>
          <Grid item lg={2}>
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
        {/* <div className="listMultiline"> */}
        <Paper className="listMultiline">
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
      </Paper>
      <Typography className="count" variant="subtitle2"> Nº de Registros: {listCount}</Typography>
    </div>
  </Fragment>
  )
}

export default Application