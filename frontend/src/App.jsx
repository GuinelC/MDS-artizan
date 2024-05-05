import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/header/header";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext"; // Importez CartProvider depuis le bon chemin
import Router from "./navigation/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Router />
            <ToastContainer position="bottom-right" theme="dark" />
          </CartProvider>
        </AuthProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
