import { MdCancel, MdCheck } from 'react-icons/md'
import PropTypes from 'prop-types'

function ListItems(props) {
    const {
        item,
        handleDelete,
        handleComplete
    } = props

    return (
        <li key={item.id}>
        <span className={`listTitle ${item.completed ? 'listItemCompleted' : ''}`}>{item.title}</span>
        <br />
        {
          !item.completed
            ? <MdCheck className="icon completeIcon" onClick={() => handleComplete(item.id)} />
            : null
        }
        <MdCancel className="icon cancelIcon" onClick={() => handleDelete(item.id)} />
        <br /><br />
      </li>
    )
}

ListItems.propTypes = {
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleComplete: PropTypes.func.isRequired
} 

export default (ListItems)