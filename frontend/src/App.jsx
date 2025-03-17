import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import MessageBar from './components/MessageBar'
import Chat from './components/Chat.jsx'
import InfiniteChat from './components/InfiniteChat.jsx'

function App() {

  return (
    <div className='d-flex flex-column h-100 justify-content-between'>
    <Navbar/>
    <InfiniteChat/>
    <MessageBar/>
    </div>
  )
}

export default App
