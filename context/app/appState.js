import axios from "axios";
import React from "react";
import clienteAxios from "../../config/axios";
import {
  MOSTAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITO,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../../types";
import appContext from "./appContext";
import AppReducer from "./appReducer";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  const limpiarAlerta = () => {
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 5000);
  };

  const mostarAlerta = (msg) => {
    dispatch({
      type: MOSTAR_ALERTA,
      payload: msg,
    });

    limpiarAlerta();
  };

  /*const subirArchivos = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }

    limpiarAlerta();
  };*/

  const subirArchivos = async (datosFile) => {

    dispatch({
      type: SUBIR_ARCHIVO,
    });


    const data = {
      base64String: datosFile.base64,
    };

    try{
      const resultado = await axios.post("https://spn36s28g0.execute-api.eu-central-1.amazonaws.com/v1/archivos",data);
      //console.log(resultado);
      const nombreArray = resultado.data.nombre.split('.');
      const nombreCompletoDocumento = nombreArray[0];

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          url: resultado.data.url,
          nombre: nombreCompletoDocumento,
        },
      });
    }catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response,
      });
    }


  };

  const crearEnlace = async () => {

    const data = {
      nombre: state.nombre,
      url: state.url
    };

    //console.log(data)

    try {
      //const resultado = await clienteAxios.post("/api/enlaces", data);

      const resultado = await axios.post("https://spn36s28g0.execute-api.eu-central-1.amazonaws.com/v1/enlaces", data);
      //console.log(resultado);


      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.estado,
      });
    } catch (error) {}
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  //agregue el password

  const agregarPassword = (password) => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password,
    });
  };

  const agregarDescargas = (descargas) => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas,
    });
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        mostarAlerta: mostarAlerta,
        subirArchivos: subirArchivos,
        crearEnlace: crearEnlace,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        limpiarState: limpiarState,
        agregarPassword: agregarPassword,
        agregarDescargas: agregarDescargas,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
