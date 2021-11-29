import React from "react";
import Alerta from "../../components/Alerta";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

  return {
    props: {
      enlace: resultado.data,
    },
  };
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get("/api/enlaces");

  return {
    path: enlaces.data.enlaces.map((item) => ({
      params: { item: item.url },
    })),
    fallback: false,
  };
}

const Enlace = ({ enlace }) => {
  const [tienePassword, setTienePassword] = React.useState(enlace.password);
  const [password, setPassword] = React.useState("");

  const AppContext = React.useContext(appContext);
  const { mostarAlerta, mensaje_archivo } = AppContext;

  const verificarPassword = async (e) => {
    e.preventDefault();
    const data = {
      password,
    };

    try {
      const resultado = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );
      setTienePassword(resultado.data.password);
    } catch (error) {
      mostarAlerta(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace esta protegido por una contaseña
          </p>
          {mensaje_archivo && <Alerta />}
          <div className="flex justify-center mt-5">
            <div className="w-11/12 max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Contaseña
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Contraseña del enlace"
                  />
                </div>

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold transition duration-500 ease-in-out cursor-pointer rounded-md"
                  value="Validar password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-400 transition duration-500 ease-in-out"
            >
              aqui
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Enlace;
