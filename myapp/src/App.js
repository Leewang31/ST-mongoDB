import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import Write from "./page/Write";
import Detail from "./page/Detail";
import Edit from "./page/Eidt";
import Login from "./page/Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <TopNav>
          <div className="topNavDiv">Todo App</div>
          <Link to="/">
            <button className="topNavButton">Home</button>
          </Link>
          <Link to="/write">
            <button className="topNavButton">Write</button>
          </Link>
          <Link to="/login">
            <button className="topNavButton">Login</button>
          </Link>
        </TopNav>
        <MainWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MainWrapper>
      </div>
    </BrowserRouter>
  );
}

const TopNav = styled.nav`
  display: flex;
  font-family: "JetBrains Mono";
  font-size: 18px;
  padding: 10px;
  background-color: lightgray;

  .topNavDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-weight: 600;
    color: #d1180b;
  }

  .topNavButton {
    font-family: "JetBrains Mono";
    font-size: 18px;
    margin: 0 5px;
    border-style: none;
    background-color: inherit;
    color: #808080;

    :hover {
      color: black;
    }
  }
`;
const MainWrapper = styled.main`
  margin: 20px;
`;

export default App;
