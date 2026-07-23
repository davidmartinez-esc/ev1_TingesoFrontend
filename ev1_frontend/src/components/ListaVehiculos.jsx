import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import gestionService from "../services/gestion.service.js";
import '../css/ListaVehiculos.css'
export default function ListaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();
  async function fetchVehiculos() {
    try{      
      const response = await gestionService.getVehiculos();  
      setVehiculos(response.data);
    }catch(error) {
      toast.error("Error al obtener a los vehiculos.");
    }
  }

  async function deleteVehiculoHandler(id) {
    //console.log(vehiculo);
    try{      
      const response = await gestionService.deleteVehiculo(id);

 

      toast.success("Se borró el vehiculo con exito");
      window.location.reload();
    }catch(error) {      
      toast.error("Error al borrar el vehiculo");
    }
  }
  
  useEffect(() => {
    fetchVehiculos();
  }, [])

  return (
    <div className="container">
      <h1>Lista de Vehiculos</h1>
  
      <table className="table table-separate "> {/* Clase personalizada aquí */}
        <thead className="table-info">
          <tr>
            <th scope='col' >ID</th>
            <th scope='col' >PATENTE</th>
            <th scope='col' >MARCA</th>
            <th scope='col' >MODELO</th>
            <th scope='col' >TIPO</th>
            <th scope='col' >TIPO DE MOTOR</th>
            <th scope='col' >ASIENTOS</th>
            <th scope='col' >AÑO</th>
            <th className="text-center"scope='col' colSpan="3" >ACCIONES</th>
          </tr>
        </thead>
        <tbody>        
          {vehiculos.map((vehiculo, index) => (
            <tr key={index} className="shadow-sm card-row"
            onClick={() => navigate(`/vehiculos/${vehiculo.id}`)}
            style={{ cursor: 'pointer' }}
            > 
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
                    <Link to={`/ingresos/crear/${vehiculo.id}`} onClick={(e) => e.stopPropagation()} className="btn btn-success btn-sm">Ingresar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                      e.stopPropagation();
                      deleteVehiculoHandler(vehiculo.id);}
                      }>
                      Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>   
  )
}