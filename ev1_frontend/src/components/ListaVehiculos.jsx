import { useEffect, useState } from "react"
import gestionService from "../services/gestion.service.js";
import { Link } from "react-router-dom";
import '../css/ListaVehiculos.css'

export default function ListaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  async function fetchVehiculos() {
    try{      
      const response = await gestionService.getVehiculos();  
      setVehiculos(response.data);
    }catch(error) {
      alert("Error al obtener a los vehiculos.");
    }
  }

  async function deleteVehiculoHandler(id) {
    //console.log(vehiculo);
    try{      
      const response = await gestionService.deleteVehiculo(id);

 

      alert("Se borró el vehiculo con exito");
      window.location.reload();
    }catch(error) {      
      alert("Error al borrar el vehiculo");
    }
  }
  
  useEffect(() => {
    fetchVehiculos();
  }, [])

  return (
    <div className="container">
      <h1>Lista de Vehiculos</h1>
  
      <table className="table table-separate"> {/* Clase personalizada aquí */}
        <thead>
          <tr>
            <th scope='col' >ID</th>
            <th scope='col' >PATENTE</th>
            <th scope='col' >MARCA</th>
            <th scope='col' >MODELO</th>
            <th scope='col' >TIPO</th>
            <th scope='col' >TIPO DE MOTOR</th>
            <th scope='col' >ASIENTOS</th>
            <th scope='col' >AÑO</th>
            <th scope='col' colSpan="3" className="text-center">ACCIONES</th>
          </tr>
        </thead>
        <tbody>        
          {vehiculos.map((vehiculo, index) => (
            <tr key={index} className="shadow-sm card-row"> {/* Clase card-row personalizada */}
              <td className="align-middle">{vehiculo.id}</td>
              <td className="align-middle">{vehiculo.patente}</td>
              <td className="align-middle">{vehiculo.marca}</td>
              <td className="align-middle">{vehiculo.modelo}</td>
              <td className="align-middle">{vehiculo.tipo}</td>
              <td className="align-middle">{vehiculo.tipoMotor}</td>
              <td className="align-middle">{vehiculo.numeroDeAsientos}</td>
              <td className="align-middle">{vehiculo.anio_Fabricacion}</td>
              <td className="align-middle text-middle" colSpan="3">
                <div className="d-flex gap-2 justify-content-center">
                    <Link to={`/vehiculos/${vehiculo.id}`} className="btn btn-primary btn-sm">Ver</Link>
                    <Link to={`/ingresos/crear/${vehiculo.id}`} className="btn btn-success btn-sm">Asignar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteVehiculoHandler(vehiculo.id)}>Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>   
  )
}