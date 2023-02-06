
const ListHeader = ({ listName }) => {

  const signout = ()=>{
    console.log('signout!');
  }
  
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="buttton-container">
        <button className="create">ADD NEW</button>
        <button className="signout" onClick={signout}>SIGNOUT</button>
      </div>
    </div>
  )
}

export default ListHeader