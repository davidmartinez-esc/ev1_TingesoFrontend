import axios from "axios";


const REPARACIONES_API_URL = "http://localhost:8090/api/v1/repEspecifica";


function getReparacionesByIdIngreso(idIngreso) {  
  return axios.get(`${REPARACIONES_API_URL}/getByIdIngreso/${idIngreso}`)
}
export default {getReparacionesByIdIngreso}