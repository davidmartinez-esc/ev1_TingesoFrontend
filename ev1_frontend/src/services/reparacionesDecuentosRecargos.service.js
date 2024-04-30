import axios from "axios";

const ESTUDIANTES_API_URL = "http://localhost:8050/api/estudiantes";
const CARRERAS_API_URL = "http://localhost:8050/api/carreras";

const VEHICULOS_GET_API_URL = "http://localhost:8050/api/v1/vehiculo/";
const VEHICULO_POST_API_URL = "http://localhost:8050/api/v1/vehiculo/save";

const REPARACIONES_API_URL = "http://localhost:8050/api/v1/repEspecifica";



function crearEstudiante(estudiante) {
  return axios.post(ESTUDIANTES_API_URL, estudiante);  
}

function getEstudiantes() {
  return axios.get(ESTUDIANTES_API_URL)
}

function getEstudiante(rutEstudiante) {  
  return axios.get(`${ESTUDIANTES_API_URL}/${rutEstudiante}`)
}

function getCarreras() {
  return axios.get(CARRERAS_API_URL);
}

function getVehiculos(){
  return axios.get(VEHICULOS_GET_API_URL);
}

function getVehiculoById(idVehiculo){
  return axios.get(`${VEHICULOS_GET_API_URL}${idVehiculo}`);
}

function crearVehiculo(vehiculo) {
  return axios.post(VEHICULOS_GET_API_URL, vehiculo);  
}

function getReparacionesByIdIngreso(idIngreso) {  
  return axios.get(`${REPARACIONES_API_URL}/getByIdIngreso/${idIngreso}`)
}
export default {getReparacionesByIdIngreso}