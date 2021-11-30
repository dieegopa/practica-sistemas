import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";
import appContext from "../context/app/appContext";

const Dropzone = () => {
  const AppContext = React.useContext(appContext);
  const { mostarAlerta, subirArchivos, cargando, crearEnlace } = AppContext;

  const state = {
    file: null,
    base64URL: "",
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log("Called", reader);
        baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    //console.log(e.target.files[0].size);
    let { file } = state;

    file = e.target.files[0];

    if (e.target.files[0].size > 5 * (10 ^ 6)) {
      getBase64(file)
        .then((result) => {
          file["base64"] = result;
          subirArchivos(file);
          setTimeout(() => {
            
           crearEnlace();
          }, 300);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mostarAlerta("Se ha superado el limite de 5 MB");
    }
  };

  return (
    <div className="items-center justify-center flex">
      <input
        className="font-bold bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 transition duration-500 ease-in-out"
        type="file"
        name="file"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default Dropzone;
