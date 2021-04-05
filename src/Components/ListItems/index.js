import { Fragment } from 'react'
import { Checkbox, Divider, IconButton, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,  Tooltip } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'

function ListItems(props) {
  const {
    item,
    handleDelete,
    handleComplete
  } = props

  return (
    <Fragment>
      <ListItem key={item.id} dense button onClick={() => handleComplete(item.id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText className={`listTitle ${item.completed ? 'listItemCompleted' : ''}`} primary={item.title} />
        <ListItemSecondaryAction>
          <Tooltip title="Remover item">
            <IconButton onClick={() => handleDelete(item.id)}>
              <Delete className="icon cancelIcon"/>
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  )
}

ListItems.propTypes = {
  item: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired
}

export default (ListItems)