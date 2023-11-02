import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        const response = await fetch('http://localhost:8080/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            const datos = await response.json();
            console.log(datos);
            document.cookie = `jwtCookie=${datos.token}; expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
            navigate('/products');
        } else if (response.status === 401) {
            setError("Usuario no registrado");
        } else {
            setError("Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="container">
            <h2>Formulario de Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input type="password" name="password" className="form-control" />
                </div>
                <div className="btn-group mb-3"> {/* Agrega la clase btn-group y mb-3 para espacio inferior */}
                    <button type="submit" className="btn btn-primary mx-2">Iniciar Sesión</button>
                    <button type="button" className="btn btn-success mx-2" onClick={() => navigate('/register')}>Registrarse</button>
                </div>
            </form>
        </div>
    );
};

