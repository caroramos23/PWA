import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios, { Axios } from "axios";
import e from "express";

function App() {
  //Creamos las variables y las Inicializamos
  const [id, setId] = useState(0);
  const [nombreAdoptante, setNombreAdoptante] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [mascota, setMascota] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [interesAdoptar, setInteresAdoptar] = useState("");
  // Para controlar los botones
  const [editar, setEditar] = useState("");
  // Para llenar lista
  const [lista, setLista] = useState([]);
  // URL de nueustra api
  const url = "http://localhost:3005/api/";

  useEffect(() => {
    listar();
  }, []);

  // Metodo listar
  const listar = () => {
    Axios.length(url)
      .then((result) => {
        setLista(result.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Tuvimos un problema",
          text: "Por el momento no pudimos listar las adopciones",
          footer: err.message,
        });
      });
  };
  // Metodo Guardar
  const handleCrear = () => {
    Axios.post(url, {
      nombreAdoptante: nombreAdoptante,
      telefono: telefono,
      email: email,
      domicilio: domicilio,
      mascota: mascota,
      caracteristicas: caracteristicas,
      interesAdoptar: interesAdoptar,
    })
      .then(() => {
        listar();
        limpiarCampos();
        Swal.fire({
          title: "<b>Registro guardado con exito</b>",
          text: `La adopcion de ${nombreAdoptante} se guardo con exito`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Tuvimos un problema",
          text: "Por el momento no podemos guardar las adopciones",
          footer: error.message,
        });
      });
  };
  // Metodo Editar
  const handleEditar = () => {
    Axios.put(url, {
      nombreAdoptante: nombreAdoptante,
      telefono: telefono,
      email: email,
      domicilio: domicilio,
      mascota: mascota,
      caracteristicas: caracteristicas,
      interesAdoptar: interesAdoptar,
      id: id,
    })
      .then(() => {
        listar();
        limpiarCampos();
        Swal.fire({
          title: "<b>Registro actualizado con exito</b>",
          text: `La adopcion de ${nombreAdoptante} se actualizo con exito`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Tuvimos un problema",
          text: "Por el momento no podemos actualizar las adopciones",
          footer: error.message,
        });
      });
  };
  //Metodo Eliminar
  const handleEliminar = (dto) => {
    Swal.fire({
      icon: "warning",
      title: "Desea elimar este registro",
      text: `Realmente desea elimar el registro de ${dto.nombre_adoptante} `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Axios.delete(url + dto.id).then(() => {
            listar();
            limpiarCampos();
            Swal.fire({
              title: "<b>Registro eliminado con exito</b>",
              text: `Registro eliminado con exito`,
              icon: "success",
            });
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Tuvimos un problema",
          text: "Por el momento no podemos eliminar las adopciones",
          footer: error.message,
        });
      });
  };
  const limpiarCampos = () => {
    setNombreAdoptante("");
    setTelefono("");
    setEmail("");
    setDomicilio("");
    setMascota("");
    setCaracteristicas("");
    setInteresAdoptar("");
    setId("");

    setEditar(false);
  };

  const editarForm = (dto) => {
    setNombreAdoptante(dto.nombre_adoptante);
    setTelefono(dto.telefono);
    setEmail(dto.email);
    setDomicilio(dto.domicilio);
    setMascota(dto.mascota);
    setCaracteristicas(dto.setCaracteristicas);
    setInteresAdoptar(dto.interesAdoptar);
    setId(dto.id);
    setEditar(true);
  };
  return (
    <div className="container">
      <div className="App">
        <div className="card text-center mt-3 shadow">
          <div className="card-header bg-primary text-white fs-6 fw-bold">
            GESTION DE ADOPCIONES
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">Nombre del Adoptante</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={nombreAdoptante}
                  onChange={(e) => {
                    setNombreAdoptante(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">Telefon:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">Correo Electronico:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">Domicilio:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={domicilio}
                  onChange={(e) => {
                    setDomicilio(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">Mascota:</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={mascota}
                  onChange={(e) => {
                    setMascota(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">
                  Caracteristicas Preferidas:
                </label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={caracteristicas}
                  onChange={(e) => {
                    setCaracteristicas(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <label className="form-label">
                  ¿Por que esta interesado em adoptar?:
                </label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={interesAdoptar}
                  onChange={(e) => {
                    setInteresAdoptar(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="card-footer">
              {editar ? (
                <div>
                  <button
                    onClick={handleEditar}
                    type="Button"
                    className="btn btn-info m-2"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={limpiarCampos}
                    type="Button"
                    className="btn btn-info m-2"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleCrear}
                    type="Button"
                    className="btn btn-info m-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={limpiarCampos}
                    type="Button"
                    className="btn btn-warning"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del Adoptante</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Correo Electronico</th>
                    <th scope="col">Domicilio</th>
                    <th scope="col">Mascota</th>
                    <th scope="col">Caracteristicas Preferidas</th>
                    <th scope="col">¿Por que esta interesado en adoptar?</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider table-info table-striped">
                  {lista.map((dto, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{dto.nombreAdoptante}</td>
                        <td>{ }dto.telefono</td>
                        <td>{ }dto.email</td>
                        <td>{ }dto.domicilio</td>
                        <td>{ }dto.mascota</td>
                        <td>{ }dto.caracteristicas</td>
                        <td>{ }dto.interes_adoptar</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="accion">
                            <button type="button" className="btn btn-info" onClick={() => { editarForm(dto); }}> Editar</button>
                            <button type="button" className="btn btn-danger" onClick={() => { handleEliminar(dto); }}> Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;