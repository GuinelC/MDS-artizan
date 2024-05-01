import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import Header from './components/header/header'
import { AuthProvider } from './context/authContext'
import Router from './navigation/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <Header />
          <Router />
          <ToastContainer position='bottom-right' theme='dark' />
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
