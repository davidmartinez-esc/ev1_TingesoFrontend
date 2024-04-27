import { useEffect, useState } from "react"
import gestionService from "../services/gestion.service.js";

export default function CrearVehiculoRefactor() {
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    marca: "",
    modelo: "",
    tipo: "",
    tipoMotor: "",
    numeroDeAsientos: 0,
    anio_Fabricacion:0,
  })


  async function crearVehiculoHandler(event) {
    event.preventDefault();
    //console.log(vehiculo);
    try{      
      const response = await gestionService.crearVehiculo(vehiculo);

      //Reinicio los estados (reinicio los campos del formulario)
      setVehiculo({
        patente: "",
        marca: "",
        modelo: "",
        tipo: "",
        tipoMotor: "",
        numeroDeAsientos: 0,
        anio_Fabricacion:0
      })

      alert("Vehiculo con patente: " + response.data.patente + " creado con exito");
    }catch(error) {      
      alert("Error al crear el vehiculo");
    }
  }

  function onChangeVehiculoHandler(event) {
    setVehiculo({      
      ...vehiculo,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <div className="container">
      <h1 className="mb-4">Ingresar Vehiculo</h1>
      <form className="border row g-3 px-4">
        <div className="col-12">
          <label 
            htmlFor="patente" 
            className="form-label"
            
          >
            Patente
          </label>
          <input 
            id="patente" 
            type="text" 
            className="form-control" 
            value={vehiculo.patente} 
            onChange={onChangeVehiculoHandler} 
          />          
        </div>

        <div className="col-md-6 mr-md-3">
          <label 
            htmlFor="marca" 
            className="form-label"
          >
            Marca
          </label>
          <input 
            id="marca" 
            type="text" 
            className="form-control" 
            value={vehiculo.marca} 
            onChange={onChangeVehiculoHandler} 
          />
        </div>
    
        <div className="col-md-6">
          <label 
            htmlFor="modelo" 
            className="form-label"
          >
            Modelo
          </label>
          <input 
            id="modelo" 
            type="text" 
            className="form-control" 
            value={vehiculo.modelo} 
            onChange={onChangeVehiculoHandler} 
          />
        </div>
      
        
        <div className="col-md-6">
          <label 
            htmlFor="tipo" 
            className="form-label"
          >
            Tipo
          </label>
          
           <select 
            id="tipo" 
            className="form-select" 
            value={vehiculo.tipo} 
            onChange={onChangeVehiculoHandler}>
            <option>Seleccionar su tipo de vehiculo</option>
            <option value="SEDAN">SEDÁN</option>
            <option value="HATCHBACK">HATCHBACK</option>
            <option value="SUV">SUV</option>
            <option value="PICKUP">PICKUP</option>
            <option value="FURGONETA">FURGONETA</option>
            </select>
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="tipoMotor" 
            className="form-label"
          >
            Tipo de motor
          </label>

            <select 
            id="tipoMotor" 
            className="form-select" 
            value={vehiculo.tipoMotor} 
            onChange={onChangeVehiculoHandler}>
            <option>Seleccionar el tipo de motor del vehiculo</option>
            <option value="GASOLINA">GASOLINA</option>
            <option value="DIESEL">DIESEL</option>
            <option value="HIBRIDO">HÍBRIDO</option>
            <option value="ELECTRICO">ELÉCTRICO</option>
            
            </select>
        </div>

        <div className="col-12">
          <label 
            htmlFor="numeroDeAsientos" 
            className="form-label"
          >
            Numero de Asientos
          </label>
          <input 
          id="numeroDeAsientos" 
          type="text" 
          className="form-control" 
          value={vehiculo.numeroDeAsientos} 
          onChange={onChangeVehiculoHandler} />
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="anio_Fabricacion" 
            className="form-label"
          >
            Año de fabricacion
          </label>
          <input 
            id="anio_Fabricacion" 
            type="text" 
            className="form-control" 
            value={vehiculo.anio_Fabricacion} 
            onChange={onChangeVehiculoHandler} />
        </div>

        

        <div className="col-12 mt-4 mb-4" >
          <button 
            type="submit" 
            className="btn btn-primary" 
            onClick={crearVehiculoHandler}
          >
            Crear Vehiculo
          </button>
        </div>
      </form>
    </div>
  )
}