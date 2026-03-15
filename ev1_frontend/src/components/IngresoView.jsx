import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import rdrService from "../services/reparacionesDecuentosRecargos.service";
import gestionService from "../services/gestion.service";
export default function IngresoView() {
    const {idIngreso} = useParams();

    const [reparaciones, setReparaciones] = useState([]);


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

    async function fetchReparaciones() {    
        try{
            const response = await rdrService.getReparacionesByIdIngreso(idIngreso)            
            setReparaciones(response.data);  
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
        fetchIngreso();
        fetchReparaciones();
    }, [])

    return(
        <div className="container mt-4"> {/* Agregamos container para alinear con el header */}
            <div>
                {ingreso ? (
                    <div>
                        <div className="card shadow-sm border-0 mb-5">
                        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                            <h4 className="mb-0 text-white">Datos del Ingreso</h4>
                        </div>
                        <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Marca y Modelo</p>
                                        <h5 className="fw-bold">{ingreso.fechaIngreso} {ingreso.horaIngreso}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Patente</p>
                                        <h5 className="text-uppercase">{ingreso.fechaSalida}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Año</p>
                                        <h5>{ingreso.horaSalida}</h5>
                                    </div>

                                    <hr className="my-2 text-muted opacity-25" />

                                </div>
                            </div>
                        </div>

                        <h2 className="text-center mb-4">Reparaciones en el ingreso</h2>
                        {reparaciones.length>0 ? 
                        ( 
                        <div className="table-responsive shadow-sm">
                            <table className="table table-hover align-middle">
                                <thead className="table-info">
                                    <tr>
                                        <th>ID VEHICULO</th>
                                        <th>COSTO TOTAL</th>
                                        <th>FECHA INGRESO</th>
                                        <th>HORA INGRESO</th>
                                        <th>FECHA SALIDA</th>
                                        <th>HORA SALIDA</th>
                                        <th>FECHA RECOGIDA</th>
                                        <th>HORA RECOGIDA</th>
                                        <th className="text-center">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>        
                                    {reparaciones.map((reparacion, index) => (
                                        <tr key={index} className="shadow-sm card-row">
                                            <td>{reparacion.nombreDeLaRep}</td>
                                            <td>{reparacion.precioDeLaReparacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        )
                        :
                        (
                            <div className="text-center">
                                <h3 className="mt-2">El vehiculo nunca ha sido ingresado</h3>
                            </div>
                        )
                        }
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status"></div>
                        <h3 className="mt-2">Cargando...</h3>
                    </div>
                )}
            </div>
        </div>
    )
}