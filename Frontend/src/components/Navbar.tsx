import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from "../assets/BiByByte_Logo.svg"; // Replace with the path to your logo
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between p-2">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="BitByByte logo"
        />
        {" BitByByte"}
      </Navbar.Brand>
      {user && (
            <div>
              <span className=" tw-text-blue-100 tw-text-lg tw-font-bold">{user.username}</span>
            </div>
          )}
      <div>
          {user && (
          <div>
            <Button onClick={handleClick}>Logout</Button>
          </div>
        )}
        {!user && (
          <div>
            <Link className="btn btn-secondary" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Signup
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Navigation;
