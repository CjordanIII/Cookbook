import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import Recipes from "./pages/Recipes";
import RecipesNew from "./pages/RecipesNew";
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
            <Route path="/recipes/new" element={<RecipesNew />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route
              path="/update"
              element={<UpdateUser user={user} setUser={setUser} />}
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;
