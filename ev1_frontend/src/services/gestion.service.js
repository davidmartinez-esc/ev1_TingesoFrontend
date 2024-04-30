import axios from "axios";



const VEHICULOS_GET_API_URL = "http://191.232.38.14:8050/api/v1/vehiculo/";
const VEHICULO_POST_API_URL = "http://191.232.38.14:8050/api/v1/vehiculo/save";

const INGRESOS_API_URL = "http://191.232.38.14:8050/api/v1/ingresoAReparacion/";




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