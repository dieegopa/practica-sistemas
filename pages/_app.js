import AppState from "../context/app/appState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
        <Component {...pageProps} />
    </AppState>
  );
}

export default MyApp;
