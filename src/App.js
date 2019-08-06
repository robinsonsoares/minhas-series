import React, { useState, useEffect } from 'react'
import Header from './Header'
import Generos from './Generos'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Home = () => {
  return <h1>Home</h1>  
}

function App() {
  const [data, setData] = useState({})
  useEffect( () => {
    axios.get('/api').then(res =>{
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/generos' component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App
