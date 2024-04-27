import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ListaVehiculos from './components/ListaVehiculos.jsx'
import CrearVehiculo from './components/CrearVehiculo.jsx'
import CrearVehiculoRefactor from './components/CrearVehiculoRefactor.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Header/>            
        <Routes> 
          <Route path="/vehiculos" element={<ListaVehiculos/>}/>
          <Route path="/vehiculos/ingresar" element={<CrearVehiculoRefactor/>}/>     
        </Routes>
      </BrowserRouter>

  )
}

export default App
