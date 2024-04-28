import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import gestionService from "../services/gestion.service.js";

export default function CrearIngresoRefactor() {
  
  const {idVehiculo} =  useParams();

  const [costoTotal, setCostoTotal] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [horaIngreso, setHoraIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [fechaRecogida, setFechaRecogida] = useState("");
  const [horaRecogida, setHoraRecogida] = useState("");


 
  async function handleCrearIngreso(e) {
    e.preventDefault();
    try{
      const response = await gestionService.crearIngreso({
        idVehiculo,
        costoTotal,
        fechaIngreso,
        horaIngreso,
        fechaSalida,
        horaSalida,
        fechaRecogida,
        horaRecogida
      })

     
      setCostoTotal(0);
      setFechaIngreso("");
      setHoraIngreso("");
      setFechaSalida("");
      setHoraSalida("");
      setFechaRecogida("");
      setHoraRecogida("");

      alert("Ingreso creado con exito");
    }catch(error) {
      console.log(error);
      alert("Error al crear el ingreso.");
    }

  }
 
  function handleRutChange(event) {
    setRut(event.target.value);
  }

  return (
    <div className="container">
      <h1 className="mb-4">Crear Ingreso</h1>
      <form className="border row g-3 px-4">

        <div className="col-md-6">
          <label htmlFor="fechaIngreso" className="form-label">Fecha Ingreso</label>
          <input 
            id="fechaIngreso" 
            type="text" 
            className="form-control" 
            value={fechaIngreso} 
            onChange={e => setFechaIngreso(e.target.value)} 
          />          
        </div>

        <div className="col-md-6 mr-md-3">
          <label htmlFor="horaIngreso" className="form-label">Hora Ingreso</label>
          <input id="horaIngreso" type="text" className="form-control" 
          value={horaIngreso} 
          onChange={e => setHoraIngreso(e.target.value)} />
        </div>
    
        <div className="col-md-6">
          <label htmlFor="fechaSalida" className="form-label">Fecha Salida</label>
          <input id="fechaSalida" type="text" className="form-control" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
        </div>
      
        
        <div className="col-md-6">
          <label htmlFor="horaSalida" className="form-label">Hora Salida</label>
          <input id="horaSalida" type="text" className="form-control" value={horaSalida} onChange={e => setHoraSalida(e.target.value)} />
        </div>

        <div className="col-md-6">
          <label htmlFor="fechaRecogida" className="form-label">Fecha Recogida</label>
          <input id="fechaRecogida" type="text" className="form-control" value={fechaRecogida} onChange={e => setFechaRecogida(e.target.value)} />
        </div>

        <div className="col-md-6">
          <label htmlFor="horaRecogida" className="form-label">Hora Recogida</label>
          <input id="horaRecogida" type="text" className="form-control" value={horaRecogida} onChange={e => setHoraRecogida(e.target.value)} />
        
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button type="submit" className="btn btn-primary" onClick={handleCrearIngreso}>
            Crear Ingreso
          </button>
        </div>
      </form>
    </div>
  )
}