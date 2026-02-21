import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos registro:", form);

    // aquí luego conectaremos backend
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Registrarse
        </button>

      </form>
    </div>
  );
}