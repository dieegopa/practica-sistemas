import React from "react";
import Link from "next/link";
import appContext from "../context/app/appContext";
import { useRouter } from "next/dist/client/router";

const Header = () => {
  const router = useRouter();

  const AppContext = React.useContext(appContext);
  const { limpiarState } = AppContext;

  React.useEffect(() => {
    const token = localStorage.getItem("rnstoken");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <img
            onClick={() => redireccionar()}
            src="/logo.svg"
            alt="logo"
            className="w-64 mb-8 md:mb-0 cursor-pointer"
          />
        </a>
      </Link>
    </header>
  );
};

export default Header;
