import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import "./form.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    state: { user, jwt, error },
    login,
  } = useAuth();

  useEffect(() => {
    if (user && jwt) {
      navigate("/dashboard");
    }
  }, [user, jwt]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className="mb-5">
        <h2 className="my-8" style={{ fontSize: "40px" }}>
          Se Connnecter{" "}
        </h2>
        <form className="login-form" action="" onSubmit={handleSubmit}>
          <Input
            className="mb-8 focus:border-black bg-transparent"
            type="email"
            name="identifier"
            label="Email"
            placeholder=""
            value={formData.identifier}
            onChange={handleChange}
          />

          <Input
            className="mb-8 focus:border-black bg-bleu"
            type="password"
            name="password"
            label="Mot de passe"
            placeholder=""
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            type="submit"
            className="border border-black text-md bg-white text-black font-bold py-5 px-8 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Se Connecter
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
