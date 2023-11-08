import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FirsStr from "./FirsStr.module.css";
import { useStore } from "../store/store";
import ProfileSign from "./SidePage/ProfileSign";
import axios from "axios";

function FIrsStr({ reset }) {
  const OwnUsers = useStore((state) => state.OwnUser);
  const addUOwnUser = useStore((state) => state.addUOwnUser);

  const [NavBar, setNavBar] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(
        localStorage.getItem("user") != null
          ? JSON.parse(localStorage.getItem("user"))
          : { log: "Goust", pas: "1" }
      );
    }).then(async (data) => {
      if (data != null) {
        if (data.log != "Goust") {
          const user = (
            await axios.get(`http://localhost:4000/api/users/${data.log}`)
          ).data;
          if (user) {
            addUOwnUser(data);
          }
        }
      }
    });
  }, [addUOwnUser]);

  function handleNavBar() {
    setNavBar(!NavBar);
  }

  return (
    <div className={FirsStr.wrap}>
      <Link
        onClick={handleNavBar}
        className={
          window.location.pathname === "/Home" ? FirsStr.focus : FirsStr.link
        }
        to={"/Home"}>
        Мои сообщения
      </Link>

      <Link
        onClick={handleNavBar}
        className={
          window.location.pathname === "/Post" ? FirsStr.focus : FirsStr.link
        }
        to={"/Post"}>
        Чат
      </Link>

      <ProfileSign reset={reset} OwnUser={OwnUsers} />
    </div>
  );
}

export default FIrsStr;
