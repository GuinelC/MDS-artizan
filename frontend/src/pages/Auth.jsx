// FFC
import { useState, useEffect } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import LoginForm from "../components/forms/LoginForms";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const {
    state: { jwt, user },
  } = useAuth();

  useEffect(() => {
    if (jwt && user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="custom">
        {isRegister ? <RegisterForm /> : <LoginForm />}
        <a
          className="my-5 text-white bg-black hover:bg-gray-800 px-4 py-3 font-bold rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte !"}
        </a>
      </div>
    </>
  );
}

export default Auth;
