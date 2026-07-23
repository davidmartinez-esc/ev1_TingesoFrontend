import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

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

    async function deleteAsignacion(idAsignacion){
        try{      
          const response = await rdrService.borrarReparacionAsignada(parseInt(idAsignacion));
          fetchReparaciones();
          toast.success("Se borró la reparacion asignada con exito");

        }catch(error) {      
          toast.error("Se hubo un error al borrar la reparacion asignada");
        }
    };
    async function fetchIngreso() {    
        try{
            const response = await gestionService.getIngresoById(idIngreso)            
            setIngreso(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
          toast.error("Error al obtener al ingreso");
        }
    }

    async function fetchReparaciones() {    
        try{
            const response = await rdrService.getReparacionesByIdIngreso(parseInt(idIngreso))            
            setReparaciones(response.data);  
            console.log(response.data); 
                            
        }catch(error) {
            toast.error("Error al obtener las reparaciones del ingreso");
        }
    }
    async function handleAsignarReparacion(e) {
        e.preventDefault();
        setCargando(true)
        try{
        const response = await rdrService.asignarReparacionesAIngreso(parseInt(idIngreso),parseInt(reparacionSeleccionada.repId))

        setReparacionSeleccionada(0);
        toast.success("Reparación asignada con exito");
        await fetchReparaciones();
        }catch(error) {
            toast.error("Error al crear la reparacion.");
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
            toast.error("Error al obtener las reparaciones disponibles");
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
                                        <th>REPARACIONES</th>
                                    </tr>
                                </thead>
                                <tbody>     
                                    {reparaciones.map((reparacion, index) => (
                                        <tr key={reparacion.repId || index} className="shadow-sm card-row">
                                            <td className="d-flex justify-content-between align-items-center">
                                                <span>{reparacion.nombreDeLaRep}</span>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-sm btn-danger" 
                                                    onClick={() => deleteAsignacion(reparacion.idAsignacion)}
                                                >
                                                    Borrar
                                                </button>
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
                                <h3 className="mt-2">No se han asignado reparaciones</h3>
                            </div>
                        )
                        }
                        <div className="row g-4 mt-4">
                            {/* Columna izquierda - Asignar nueva reparación */}
                            <div className="col-md-6">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Asignar Nueva Reparación</h5>
                                        
                                        <label htmlFor="select-reparacion" className="form-label">
                                            Selecciona una reparación:
                                        </label>
                                        
                                        <select 
                                            id="select-reparacion"
                                            className="form-select mb-3" 
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

                                        {reparacionSeleccionada && (
                                            <div className="mt-3 p-3 bg-light rounded">
                                                <p className="mb-2"><strong>Precio: </strong>${reparacionSeleccionada.precio}</p>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary w-100"
                                                    onClick={handleAsignarReparacion}
                                                    disabled={cargando}
                                                >
                                                    {cargando ? "Guardando..." : "Asignar Reparación"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha - Calcular costo final */}
                            <div className="col-md-6">
                                <div className="card shadow-sm">
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <h5 className="card-title mb-3">Costo Total</h5>
                                        <p className="text-muted mb-4">Calcula el costo final de todas las reparaciones asignadas, aplicando recargos, descuentos y bonos</p>
                                        <button 
                                            type="button" 
                                            className="btn btn-success btn-lg"
                                            onClick={() => console.log('Calcular costo')}
                                        >
                                            Calcular Costo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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