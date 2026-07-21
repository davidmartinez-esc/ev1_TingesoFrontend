import axios from "axios";


const REPARACIONES_API_URL = "http://localhost:8090/api/v1/repEspecifica";
const REPARACIONES_DISPONIBLES_API_URL = "http://localhost:8090/api/v1/precioPorRep";
const INGRESO_API_URL = "http://localhost:8090/api/v1/ingresoAReparacion";

function getReparacionesByIdIngreso(idIngreso) {  
  return axios.get(`${REPARACIONES_API_URL}/getByIdIngreso/${idIngreso}`)
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
export default {getReparacionesByIdIngreso,getReparacionesDisponibles,getReparacionesDisponiblesByIdIngreso}