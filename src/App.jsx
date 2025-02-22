import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import TaskPage from "./pages/taskPage";

const App = () => {

  //we will use local storage to check if the user is loggedin or not

  const [currUser, setCurrUser] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return {
        isLoggedIn: true,
        fullName: "Guest",
      };
    } else {
      return {
        isLoggedIn: false,
        fullName: "Guest",
      };
    }
  });

  const afterLogin = (respObj) => {
    const newStateOfUser = { isLoggedIn: true, fullName: respObj.data.user.fullName };
    localStorage.setItem("isLoggedIn", true);
    setCurrUser(newStateOfUser);
  };

  const getLoggedInUserInfo = async () => {
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/me", {
      credentials: "include",
    });
    const respObj = await resp.json();
    console.log(respObj);
    setCurrUser({
      isLoggedIn: true,
      fullName: respObj.data.user.fullName,
      email: respObj.data.user.email,
    });
  };

  useEffect(() => {
    if (currUser.isLoggedIn) {
      getLoggedInUserInfo();
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem("isLoggedIn");
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/logout", {
      credentials: "include",
    });
    const respObj = await resp.json();
    if (respObj.status === "success") {
      setCurrUser({
        isLoggedIn: false,
        fullName: "Guest",
      });
    } else {
      alert("Error in Logout! " + respObj.message);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={currUser.isLoggedIn ? <HomePage currUser={currUser} handleLogout={handleLogout} /> : <Navigate to="/sign-up" />} />
          <Route path="/login" element={currUser.isLoggedIn ? <Navigate to="/" /> : <LoginPage afterLogin={afterLogin} />} />
          <Route path="/sign-up" element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
          <Route
            path="*"
            element={
              <div>
                Page not found <Link to="/">Home</Link>
              </div>
            }
          />
          
          <Route path="/tasks" element={currUser.isLoggedIn ?<TaskPage /> : <Navigate to="/login" /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;