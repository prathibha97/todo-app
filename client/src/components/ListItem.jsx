import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import TickIcon from '../components/TickIcon'
import Modal from './Modal'

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${task.id}`, {
        method: 'DELETE',
      })
      if (response.statusCode === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li className='list-item'>
      <div className='info-container'>
        <TickIcon />
        <p className='task-title'>{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>
      <div className='buttton-container'>
        <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={deleteItem}>DELETE</button>
      </div>
      {showModal && (
        <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData} />
      )}
    </li>
  )
}

export default ListItem