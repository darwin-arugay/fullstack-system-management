import "./App.css";
import AdminPage from "./screens/AdminPage";
import LoginPage from "./screens/loginpage/Login";
import Homepage from "./screens/homepage/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
