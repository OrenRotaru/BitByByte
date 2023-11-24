import { FormEvent, useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {login, error, isLoading} = useLogin();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);

  }

  return (
<div className="login border container">
      <div className="row">
        <div className="col-md-6">
          <div className="p-4">
            <h1 className="text-center mb-4">Login</h1>
            <form className="login" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary mb-3"
              >
                Login
              </button>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Signup"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
