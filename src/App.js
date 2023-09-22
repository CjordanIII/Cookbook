import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderHistory from "./pages/OrderHistoryPage";
import UpdateUser from "./pages/UpdateUser";
import { getUser } from "./utils/users-service";
function App() {
  const [user, setUser] = useState(getUser()); // look for token
  return (
    <div className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/update" element={<UpdateUser user={user} setUser ={setUser}/>} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;
