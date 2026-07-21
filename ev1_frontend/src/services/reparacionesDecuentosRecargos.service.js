import axios from "axios";


const REPARACIONES_API_URL = "http://localhost:8090/api/v1/repEspecifica";
const REPARACIONES_DISPONIBLES_API_URL = "http://localhost:8090/api/v1/precioPorRep";
const INGRESO_API_URL = "http://localhost:8090/api/v1/ingresoAReparacion";

function getReparacionesByIdIngreso(idIngreso){  
  return axios.get(`${INGRESO_API_URL}/obtenerReparaciones`,{
    params:{
      idIngreso: parseInt(idIngreso)
    }
  })
}
function getReparacionesDisponibles() {  
  return axios.get(`${REPARACIONES_DISPONIBLES_API_URL}/`)
}

function getReparacionesDisponiblesByIdIngreso(idIngreso){  
  return axios.get(`${INGRESO_API_URL}/obtenerReparacionesDisponibles`,{
    params:{
      idIngreso: idIngreso
    }
  })
}
function asignarReparacionesAIngreso(idIngreso,idReparacion){  
  return axios.post(`${INGRESO_API_URL}/asignarReparacion`,{},{
    params:{
      idIngreso: idIngreso,
      idReparacion: idReparacion,

    }
  })
}
export default {getReparacionesByIdIngreso,getReparacionesDisponibles,getReparacionesDisponiblesByIdIngreso,asignarReparacionesAIngreso}