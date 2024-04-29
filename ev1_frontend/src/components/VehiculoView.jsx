import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gestionService from "../services/gestion.service";

export default function VehiculoView() {
    const {idVehiculo} = useParams();

    const [ingresos, setIngresos] = useState([]);

    const [vehiculo, setVehiculo] = useState(null);

    async function fetchVehiculo() {    
        try{
            const response = await gestionService.getVehiculoById(idVehiculo)            
            setVehiculo(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
            alert("Error al obtener el vehiculo");
        }
    }

    async function deleteIngresoHandler(id) {
        //console.log(vehiculo);
        try{      
          const response = await gestionService.deleteIngreso(id);
    
     
    
          alert("Se borró el ingreso a reparacion con exito");
          window.location.reload();
        }catch(error) {      
          alert("Error al borrar el ingreso a reparacion");
        }
      }

    async function fetchIngresos() {
        try{      
          const response = await gestionService.getIngresosByIdVehiculo(idVehiculo);  
          setIngresos(response.data);
        }catch(error) {
          alert("Error al obtener a los ingresos a reparacion.");
        }
      }

      

    useEffect(() => {
        fetchVehiculo();
        fetchIngresos();
    }, [])

    return(
        <div>

            <h2 className="text-center">Datos del Vehiculo</h2>
           
            <div>
                {vehiculo ? (
                    <div>
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
                            <tr>
                                <td>{vehiculo.id}</td>
                                <td>{vehiculo.patente}</td>
                                <td>{vehiculo.marca}</td>
                                <td>{vehiculo.modelo}</td>
                                <td>{vehiculo.tipo}</td>
                                <td>{vehiculo.tipoMotor}</td>
                                <td>{vehiculo.numeroDeAsientos}</td>
                                <td>{vehiculo.anio_Fabricacion}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="container">
                                    <h2 className="text-center">Ingresos Del Vehiculo</h2>
                                
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">ID VEHICULO</th>
                                            <th scope="col">COSTO TOTAL</th>
                                            <th scope="col">FECHA INGRESO</th>
                                            <th scope="col">HORA INGRESO</th>
                                            <th scope="col">FECHA SALIDA</th>
                                            <th scope="col">HORA SALIDA</th>
                                            <th scope="col">HORA RECOGIDA</th>
                                            <th scope="col">HORA RECOGIDA</th>
                                        </tr>
                                        </thead>
                                        <tbody>        
                                        {                                 
                                            ingresos.map((ingreso, index) => (
                                            <tr key={index}>
                                                <td>{ingreso.idVehiculo}</td>
                                                <td>{ingreso.costoTotal}</td>
                                                <td>{ingreso.fechaIngreso}</td>
                                                <td>{ingreso.horaIngreso}</td>
                                                <td>{ingreso.fechaSalida}</td>
                                                <td>{ingreso.horaSalida}</td>
                                                <td>{ingreso.fechaRecogida}</td>
                                                <td>{ingreso.horaRecogida}</td>

                                                <td>
                                                    <Link to={`/ingresos/${ingreso.id}`}><button type="bbutton" className="btn btn-primary btn-sm"> Ver detalles </button></Link>
                                                </td>
                                                <td> <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-danger btn-solid" 
                                                        onClick={()=>deleteIngresoHandler(ingreso.id)}
                                                        >
                                                        Borrar Ingreso
                                                    </button>
                                                </td>
                                               

                                            </tr>
                                            
                                            ))
                                        }
                                        </tbody>
                                    </table>
                         </div>   

                        
                    </div>
                )
                :
                (
                    <h3 className="text-center">Cargando...</h3>
                )
            
            }
            </div>
        </div>
    )
}