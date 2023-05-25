import NavBar from "components/NavBar";
import Home from "views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "views/Login";
import Register from "views/Register";
import Vins from "views/Vins";
import Plats from "views/Plats";
import NoPage from "views/NoPage";
import AllVins from "views/AllVins";
import Account from "views/Account";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/wine" element={<Vins />} />
          <Route exact path="/pal" element={<Plats />} />
          <Route exact path="/all-wines" element={<AllVins />} />
          <Route exact path="/compte" element={<Account />} />
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
