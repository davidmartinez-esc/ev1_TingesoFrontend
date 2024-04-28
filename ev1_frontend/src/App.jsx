import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ListaVehiculos from './components/ListaVehiculos.jsx'
import CrearVehiculo from './components/CrearVehiculo.jsx'
import CrearVehiculoRefactor from './components/CrearVehiculoRefactor.jsx'
import CrearIngresoRefactor from './components/CrearIngresoRefactor.jsx'
import VehiculoView from './components/VehiculoView.jsx'
import IngresoView from './components/IngresoView.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Header/>            
        <Routes> 
          <Route path="/vehiculos" element={<ListaVehiculos/>}/>
          <Route path="/vehiculos/ingresar" element={<CrearVehiculoRefactor/>}/>
          <Route path="/vehiculos/:idVehiculo" element={<VehiculoView/>}/>
          <Route path="/ingresos/crear/:idVehiculo" element={<CrearIngresoRefactor/>}/>
          <Route path="/ingresos/:idIngreso" element={<IngresoView/>}/>        
        </Routes>
      </BrowserRouter>

  )
}

export default App
