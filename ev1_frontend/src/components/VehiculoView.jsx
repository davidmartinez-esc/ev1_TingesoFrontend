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

    return (
        <div className="container mt-4"> {/* Agregamos container para alinear con el header */}
            <div>
                {vehiculo ? (
                    <div>
                        <div className="card shadow-sm border-0 mb-5">
                        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                            <h4 className="mb-0 text-white">Datos del Vehículo</h4>
                            <span className="badge bg-light text-primary">ID: {vehiculo.id}</span>
                        </div>
                        <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Marca y Modelo</p>
                                        <h5 className="fw-bold">{vehiculo.marca} {vehiculo.modelo}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Patente</p>
                                        <h5 className="text-uppercase">{vehiculo.patente}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Año</p>
                                        <h5>{vehiculo.anio_Fabricacion}</h5>
                                    </div>

                                    <hr className="my-2 text-muted opacity-25" />

                                    {/* Detalles técnicos */}
                                    <div className="col-6 col-md-3">
                                        <span className="text-muted d-block small">Tipo</span>
                                        <span className="fw-semibold">{vehiculo.tipo}</span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <span className="text-muted d-block small">Motor</span>
                                        <span className="fw-semibold">{vehiculo.tipoMotor}</span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <span className="text-muted d-block small">Asientos</span>
                                        <span className="fw-semibold">{vehiculo.numeroDeAsientos}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-center mb-4">Ingresos Del Vehículo</h2>
                        {ingresos.length>0 ? 
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
                                    {ingresos.map((ingreso, index) => (
                                        <tr key={index} className="shadow-sm card-row">
                                            <td>{ingreso.idVehiculo}</td>
                                            <td>${ingreso.costoTotal}</td>
                                            <td>{ingreso.fechaIngreso}</td>
                                            <td>{ingreso.horaIngreso}</td>
                                            <td>{ingreso.fechaSalida}</td>
                                            <td>{ingreso.horaSalida}</td>
                                            <td>{ingreso.fechaRecogida}</td>
                                            <td>{ingreso.horaRecogida}</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Link to={`/ingresos/${ingreso.id}`} className="btn btn-primary btn-sm">
                                                        Ver
                                                    </Link>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-danger" 
                                                        onClick={() => deleteIngresoHandler(ingreso.id)}
                                                    >
                                                        Borrar
                                                    </button>
                                                </div>
                                            </td>
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
    );
}