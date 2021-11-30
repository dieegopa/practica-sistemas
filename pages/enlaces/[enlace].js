import axios from "axios";
import React from "react";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";

export async function getServerSideProps({ params }) {
  const { enlace } = params;

  const resultado = await axios.get(
    `https://spn36s28g0.execute-api.eu-central-1.amazonaws.com/v1/enlaces?nombre=${enlace}`
  );

  //const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

  return {
    props: {
      enlace: resultado.data.enlace.Item,
    },
  };
}

export async function getServerSidePaths() {
  const enlaces = await axios.get(
    "https://spn36s28g0.execute-api.eu-central-1.amazonaws.com/v1/todosenlaces"
  );

  return {
    path: enlaces.data.map((item) => ({
      params: { item: item.nombre },
    })),
    fallback: false,
  };
}

const Enlace = ({ enlace }) => {
  const AppContext = React.useContext(appContext);

  return (
    <Layout>
      <>
        <h2 className="text-center text-5xl text-red-600">Click derecho y guardar como...</h2>
        <h1 className="text-4xl text-center text-gray-700">
          Descarga tu archivo
        </h1>
        <div className="flex items-center justify-center mt-10">
          <a
            href={enlace.url}
            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-400 transition duration-500 ease-in-out"
          >
            aqui
          </a>
        </div>
      </>
    </Layout>
  );
};

export default Enlace;
