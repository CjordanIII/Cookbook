const { Link } = require("react-router-dom");

function NavBar(){
    return (
      <nav>
        <Link to="/orders"> Orders</Link>&nbsp;|&nbsp;
        <Link to="/orders/new">New Order</Link>
      </nav>
    );
}

export default NavBar