import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Base from "./Base/Base";
import Body from "./Components/Body/Body";
import AddNotes from "./Components/Notes/AddNotes";
import UserSignup from "./Components/userEntry/UserSignup";
import UserLogin from "./Components/userEntry/UserLogin";
import UpdateNotes from "./Components/Notes/UpdateNotes";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useCommonContext } from "./Base/ContextApi/context";
import { CircularProgress } from "@mui/material";

function App() {
  const { id } = useParams()
  const navigate = useNavigate();

  const { commonStates, setCommonStates,dummy, getCatgories, getNotes } =
    useCommonContext();

  useEffect(() => {
    
    const userToken = localStorage.getItem("userToken");

    if (!userToken) navigate("/login", { replace: true });

    const user = decodeToken(userToken);
 
    if (!user) {
      localStorage.removeItem("userToken");
      navigate("/login", { replace: true });
    } else {
      setCommonStates({
        ...commonStates,
        userToken: userToken,
      });
    }

    getCatgories();
    getNotes();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route path="/add/notes" element={<AddNotes />} />
        <Route exact path="/update/notes/:id" element={<UpdateNotes />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </div>
  );
}

export default App;
