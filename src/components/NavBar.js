import * as userapi from '../utils/users-api';
import * as userService from "../utils/users-service";
const { Link } = require("react-router-dom");

function NavBar({ user, setUser }) {
  const handleLogout = () => {
    userService.logOut();
    setUser(null);
  };
  const deleteUser = ()=>{
    userapi.deLete(user)
    userService.delEte()
    setUser(null);
  }
  return (
    <nav>
      <h3>Welcome {user.name}</h3>
      <Link to="/orders"> Orders</Link>&nbsp;|&nbsp;
      <Link to="/orders/new">New Order</Link>&nbsp;|
      <Link to="" onClick={handleLogout}>
        Log out
      </Link>
      &nbsp;|
      <Link to="/login" onClick={deleteUser}>
        Delete user
      </Link>
    </nav>
  );
}

export default NavBar;
