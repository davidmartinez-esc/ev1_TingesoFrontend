import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gestionService from "../services/gestion.service";

export default function IngresoView() {
    const {idIngreso} = useParams();

    const [ingresos, setIngresos] = useState([]);

    const [ingreso, setIngreso] = useState(null);

    async function fetchIngreso() {    
        try{
            const response = await gestionService.getIngresoById(idIngreso)            
            setIngreso(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
            alert("Error al obtener al ingreso");
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
        fetchIngreso();
    }, [])

    return(
        <div>

            <h2 className="text-center">Datos del Ingreso</h2>
           
            <div>
                {ingreso ? (
                    <div>
                     <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">COSTO TOTAL</th>
                                    <th scope="col">FECHA INGRESO</th>
                                    <th scope="col">HORA INGRESO</th>
                                    <th scope="col">FECHA SALIDA</th>
                                    <th scope="col">HORA SALIDA</th>
                                    <th scope="col">FECHA RECOGIDA</th>
                                    <th scope="col">HORA RECOGIDA</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{ingreso.id}</td>
                                <td>{ingreso.costoTotal}</td>
                                <td>{ingreso.fechaIngreso}</td>
                                <td>{ingreso.horaIngreso}</td>
                                <td>{ingreso.fechaSalida}</td>
                                <td>{ingreso.horaSalida}</td>
                                <td>{ingreso.fechaRecogida}</td>
                                <td>{ingreso.horaRecogida}</td>
                            </tr>
                            </tbody>
                        </table>
                        

                        
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