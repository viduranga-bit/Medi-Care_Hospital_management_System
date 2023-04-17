import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { RoleManager } from "./RoleManager";
import { ToastContainer, toast } from "react-toastify";

const Main = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
   const location = useLocation();
  const message = location.state?.message;
  const {
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    setCurrentColor,
    setCurrentMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

 

  useEffect(() => {
    console.log("Check loggin******************");
    if ("token" in localStorage) {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      //token validation
      validate(token);
      //check whether this route allowed for current access level
      if (
        !RoleManager[user?.role?.authority].includes(
          location.pathname.split("/")[1]
        )
      )
        navigate("/");
      toast.success(message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } else navigate("/login");

  }, [navigate]);

  const validate = async (token) => {
    await axios
      .get(`http://localhost:8080/validate/${token}`)
      .then((res) => {
        if (res.status == 200) {
          //decode token
          setUser(token);
        } else navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-70 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-52 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
            <ToastContainer/>
        </div>
        <div>
          {themeSettings && <ThemeSettings />}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
