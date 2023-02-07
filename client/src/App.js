import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';

function App() {
  const [tasks, setTasks] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const authToken = cookies.AuthToken
  const userEmail = cookies.Email

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${userEmail}`)
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  }, [])

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {authToken ? (
        <>
          <ListHeader listName='🏝️Holiday check list' getData={getData} />
          <p className='user-email'>Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      ) : (
        <Auth />
      )}
      <p className='copyright'>&copy; Prathibha Ratnayake</p>
    </div>
  );
}

export default App;
