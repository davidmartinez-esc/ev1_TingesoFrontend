import { useEffect, useState } from "react"
import gestionService from "../services/gestion.service.js";

export default function CrearVehiculo() {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoMotor, setTipoMotor] = useState("");
  const [numeroDeAsientos, setNumeroDeAsientos] = useState(0);
  const [anio_Fabricacion, setAnio_Fabricacion] = useState(0);

  const [carreras, setCarreras] = useState(null);

  async function handlerCrearVehiculo(e) {
    e.preventDefault();
    try{
      const response = await gestionService.crearEstudiante({
        patente,
        marca,
        modelo,
        tipo,
        tipoMotor,
        numeroDeAsientos,
        anio_Fabricacion
      })

      setPatente("");
      setMarca("");
      setModelo("");
      setTipo("");
      setTipoMotor("");
      setNumeroDeAsientos(0);
      setAnio_Fabricacion(0);

      alert("Vehiculo ingresado con exito en el sistema");
    }catch(error) {
      console.log(error);
      alert("Error al ingresar vehiculo");
    }

  }

  function handlePatenteChange(event) {
    setPatente(event.target.value);
  }

  return (
    <div className="container">
      <h1 className="mb-4">Ingresar Vehiculo</h1>
      <form className="border row g-3 px-4">

        <div className="col-12">
          <label htmlFor="patente" className="form-label">Patente</label>
          <input 
            id="patente" 
            type="text" 
            className="form-control" 
            value={patente} 
            onChange={handlePatenteChange} 
          />          
        </div>

        <div className="col-md-6 mr-md-3">
          <label htmlFor="marca" className="form-label">Marca</label>
          <input id="marca" type="text" className="form-control" 
          value={marca} 
          onChange={e => setMarca(e.target.value)} />
        </div>
    
        <div className="col-md-6">
          <label htmlFor="modelo" className="form-label">Modelo</label>
          <input id="modelo" type="text" className="form-control" value={modelo} onChange={e => setModelo(e.target.value)} />
        </div>
      
        
        <div className="col-md-6">
          <label htmlFor="calle" className="form-label">Calle</label>
          <input id="calle" type="text" className="form-control" value={calle} onChange={e => setCalle(e.target.value)} />
        </div>

        <div className="col-md-6">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <input id="ciudad" type="text" className="form-control" value={ciudad} onChange={e => setCiudad(e.target.value)} />
        </div>

        <div className="col-12">
          <label htmlFor="inputState" className="form-label">Carrera</label>
          <select id="inputState" className="form-select" value={idCarrera} onChange={e => setIdCarrera(e.target.value)}>
            <option>Seleccionar una carrera...</option>
            {
              carreras !== null &&
              (carreras.map((carrera, index) => (
                <option key={index} value={carrera.id}>{carrera.nombre}</option>
              )))              
            }
          </select>
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button type="submit" className="btn btn-primary" onClick={handleCrearEstudiante}>
            Crear Estudiante
          </button>
        </div>
      </form>
    </div>
  )
}