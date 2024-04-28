import axios from "axios";

const ESTUDIANTES_API_URL = "http://localhost:80/api/estudiantes";
const CARRERAS_API_URL = "http://localhost:80/api/carreras";

const VEHICULOS_GET_API_URL = "http://localhost:8080/api/v1/vehiculo/";
const VEHICULO_POST_API_URL = "http://localhost:8080/api/v1/vehiculo/save";

const INGRESOS_API_URL = "http://localhost:8080/api/v1/ingresoAReparacion/";



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

function deleteVehiculo(idVehiculo) {
  return axios.delete(`${VEHICULOS_GET_API_URL}${idVehiculo}`);  
}

function crearIngreso(ingreso) {
  return axios.post(INGRESOS_API_URL, ingreso);  
}

function getIngresos(){
  return axios.get(INGRESOS_API_URL);
}

function getIngresosByIdVehiculo(idVehiculo){
  return axios.get(`${INGRESOS_API_URL}getById/${idVehiculo}`);
}

function deleteIngreso(idIngreso) {
  return axios.delete(`${INGRESOS_API_URL}${idIngreso}`);  
}

function getIngresoById(idIngreso){
  return axios.get(`${INGRESOS_API_URL}${idIngreso}`);
}
export default {getVehiculos,crearVehiculo,
  deleteVehiculo,crearIngreso,getVehiculoById,getIngresos,getIngresosByIdVehiculo,deleteIngreso,getIngresoById}