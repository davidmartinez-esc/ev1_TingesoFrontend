import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import rdrService from "../services/reparacionesDecuentosRecargos.service";
import gestionService from "../services/gestion.service";
export default function IngresoView() {
    const {idIngreso} = useParams();

    const [reparaciones, setReparaciones] = useState([]);
    const [reparacionesDisponibles, setReparacionesDisponibles] = useState([]);
    const [reparacionSeleccionada, setReparacionSeleccionada] = useState(0);
    const [cargando, setCargando] = useState(false);


    const [ingresos, setIngresos] = useState([]);

    const [ingreso, setIngreso] = useState(null);

    const formatearFecha=(fechaISO)=>{
        if (!fechaISO) return "-";
                const [año, mes, dia] = fechaISO.split("-");
                return `${dia}/${mes}/${año}`;
    }
    const handleReparacionChange = (e) => {
        const idSeleccionado = e.target.value;
        
        const reparacionEncontrada = reparacionesDisponibles.find(
        (r) => r.repId === parseInt(idSeleccionado)
        );

        setReparacionSeleccionada(reparacionEncontrada || null);
    };
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
            const response = await rdrService.getReparacionesByIdIngreso(parseInt(idIngreso))            
            setReparaciones(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
            alert("Error al obtener las reparaciones del ingreso");
        }
    }
    async function handleAsignarReparacion(e) {
        e.preventDefault();
        setCargando(true)
        try{
        const response = await rdrService.asignarReparacionesAIngreso(parseInt(idIngreso),parseInt(reparacionSeleccionada.repId))

        setReparacionSeleccionada(0);
        alert("Reparación guardada con exito");

        }catch(error) {
        console.log(error);
        alert("Error al crear la reparacion.");
        }finally{
            setCargando(false)
        }

    }
    async function fetchReparacionesDisponibles() {    
        try{
            const response = await rdrService.getReparacionesDisponiblesByIdIngreso(idIngreso)            
            setReparacionesDisponibles(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
            alert("Error al obtener las reparaciones disponibles");
        }
    }

    useEffect(() => {
        fetchIngreso();
        fetchReparaciones();
        fetchReparacionesDisponibles();
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
                                        <p className="mb-1 text-muted small text-uppercase">Fecha y hora ingreso</p>
                                        <h5 className="fw-bold">{formatearFecha(ingreso.fechaIngreso)} {ingreso.horaIngreso}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Fecha y hora salida</p>
                                        <h5 className="fw-bold">{formatearFecha(ingreso.fechaSalida)} {ingreso.horaSalida}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-muted small text-uppercase">Fecha y hora recogida</p>
                                        <h5 className="fw-bold">{formatearFecha(ingreso.fechaRecogida)} {ingreso.horaRecogida}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-center mb-4">Reparaciones asignadas</h2>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        )
                        :
                        (
                            <div className="text-center">
                                <h3 className="mt-2">No se han asignado reparaciones</h3>
                                <div className="mt-3">
                                        <label htmlFor="select-reparacion" className="form-label d-block">
                                        Selecciona una reparación:
                                        </label>
                                        
                                        <select 
                                        id="select-reparacion"
                                        className="form-select w-50 mx-auto" 
                                        value={reparacionSeleccionada ? reparacionSeleccionada.repId:""}
                                        onChange={handleReparacionChange}
                                        >
                                        <option value="">-- Seleccionar --</option>
                                        
                                        {reparacionesDisponibles.map((reparacion) => (
                                            <option key={reparacion.repId} value={reparacion.repId}>
                                            {reparacion.nombreDeLaRep} - ${reparacion.precio}
                                            </option>
                                        ))}
                                        </select>
                                </div>
                                {reparacionSeleccionada && (
                                        <div className="mt-3 text-success">
                                        <strong>Precio: </strong> ${reparacionSeleccionada.precio}
                                        <div className="mt-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary"
                                                onClick={handleAsignarReparacion}
                                                disabled={cargando}
                                            >
                                                {cargando ? "Guardando..." : "Asignar Reparación"}
                                            </button>
                                            </div>
                                        </div>
                                    )}
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