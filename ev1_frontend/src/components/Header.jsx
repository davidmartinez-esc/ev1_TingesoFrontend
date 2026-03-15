import { NavLink } from "react-router-dom";
import carLogo from "../assets/car-64.png"

export default function Header () {
  return (
    <div className="container mt-3">
      <nav className="navbar navbar-expand-lg b-body-tertiary mb-3 bg-info rounded-4 ps-5 pe-5 py-0">
        <div className="container-fluid ">
          <img className="me-3 " src={carLogo} alt="" />
          <a className="navbar-brand fs-4 text-white" href="/">Gestion Vehiculos</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-3 gap-4">
              <li className="nav-item d-flex">
                <NavLink 
                  to="/vehiculos" 
                  style={{ height: '70px' }}
                  end // <--- CRUCIAL: evita que se quede activo cuando vas a /ingresar
                  className={({ isActive }) => 
                    `nav-link  text-white fs-5 d-flex align-items-center ${isActive ? "active text-white fs-5 border-bottom border-white border-5 " : ""}`
                  }
                >
                  Lista Vehiculos
                </NavLink>
              </li>
              
              <li className="nav-item d-flex">
                <NavLink 
                  to="/vehiculos/ingresar"
                  style={{ height: '70px' }}
                  className={({ isActive }) => 
                    `nav-link  text-white fs-5 d-flex align-items-center ${isActive ? "active text-white fs-5 border-bottom border-white border-5 " : ""}`
                  }
                >
                  Crear Automovil
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}