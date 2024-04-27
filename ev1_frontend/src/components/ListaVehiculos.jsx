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
  
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">PATENTE</th>
            <th scope="col">MARCA</th>
            <th scope="col">MODELO</th>
            <th scope="col">TIPO</th>
            <th scope="col">TIPO DE MOTOR</th>
            <th scope="col">NUMERO DE ASIENTOS</th>
            <th scope="col">AÑO DE FABRICACION</th>
          </tr>
        </thead>
        <tbody>        
          {                                 
            vehiculos.map((vehiculo, index) => (
              <tr key={index}>
                <td>{vehiculo.id}</td>
                <td>{vehiculo.patente}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.tipo}</td>
                <td>{vehiculo.tipoMotor}</td>
                <td>{vehiculo.numeroDeAsientos}</td>
                <td>{vehiculo.anio_Fabricacion}</td>
                <td> <button 
               type="button" 
               className="btn btn-sm btn-danger btn-solid" 
               onClick={()=>deleteVehiculoHandler(vehiculo.id)}
               >
               Borrar Vehiculo
               </button></td>
               
              </tr>
            
            ))
          }
        </tbody>
      </table>
    </div>   
  )
}