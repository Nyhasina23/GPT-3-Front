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
import AddBlog from "views/AddBlog";
import UserInfo from "./components/UserInfo";
import UserPassword from "./components/UserPassword";
import Bilbio from "./components/Bilbio";
import PlatBilbio from "./components/PlatBilbio";
import BlogEdit from "components/BlogEdit";
import BlogDetail from "views/BlogDetail";
import Mention from "views/Mention";
import SnackBar from "common/SnackBar";
import { AddPartenaire } from "views/AddPartenaire";
import GenerateWithPartenaire from "views/GenerateWithPartenaire";
import { AddVinPartenaire } from "components/AddVinPartenaire";
import { AddPlatPartenaire } from "components/AddPlatPartenaire";
import { AccordList } from "components/AccordList";
import BlogList from "views/BlogList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <SnackBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/wine" element={<Vins />} />
          <Route exact path="/pal" element={<Plats />} />
          <Route exact path="/all-wines" element={<AllVins />} />
          <Route path="compte" element={<Account />}>
            <Route path="blog/add" element={<AddBlog />} />
            <Route path="user/info" element={<UserInfo />} />
            <Route path="user/password" element={<UserPassword />} />
            <Route path="user/biblio/wine" element={<Bilbio />} />
            <Route path="user/biblio/pal" element={<PlatBilbio />} />
            <Route path="user/biblio/accord" element={<AccordList />} />
            <Route exact path="partenaire/add" element={<AddPartenaire />} />
            <Route exact path="vins/add" element={<AddVinPartenaire />} />
            <Route exact path="plats/add" element={<AddPlatPartenaire />} />
          </Route>
          <Route exact path="/blog/edit/:id" element={<BlogEdit />} />
          <Route exact path="/blog/:id" element={<BlogDetail />} />
          <Route exact path="/mention" element={<Mention />} />
          <Route exact path="/generate" element={<GenerateWithPartenaire />} />
          <Route exact path="/blogs" element={<BlogList />} />
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
