import axios from "axios";

const ESTUDIANTES_API_URL = "http://localhost:80/api/estudiantes";
const CARRERAS_API_URL = "http://localhost:80/api/carreras";

const VEHICULOS_GET_API_URL = "http://localhost:8080/api/v1/vehiculo/";
const VEHICULO_POST_API_URL = "http://localhost:8080/api/v1/vehiculo/save";


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

function crearVehiculo(vehiculo) {
  return axios.post(VEHICULOS_GET_API_URL, vehiculo);  
}

function deleteVehiculo(idVehiculo) {
  return axios.delete(`${VEHICULOS_GET_API_URL}${idVehiculo}`);  
}

export default {crearEstudiante, getEstudiante, getEstudiantes, getCarreras, getVehiculos,crearVehiculo,deleteVehiculo}