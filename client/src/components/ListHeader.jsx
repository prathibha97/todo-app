import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";

const ListHeader = ({ listName, getData }) => {

  const [showModal, setShowModal] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null)


  const signout = () => {
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="buttton-container">
        <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
        <button className="signout" onClick={signout}>SIGNOUT</button>
      </div>
      {
        showModal && (
          <Modal mode='create' setShowModal={setShowModal} getData={getData} />
        )
      }
    </div>
  )
}

export default ListHeader