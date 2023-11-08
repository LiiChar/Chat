import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FirsStr from "./FirsStr.module.css";
import { useStore } from "../store/store";
import ProfileSign from "./SidePage/ProfileSign";

function FIrsStr({ reset }) {
  const OwnUsers = useStore((state) => state.OwnUser);
  const addUOwnUser = useStore((state) => state.addUOwnUser);

  const [NavBar, setNavBar] = useState(true);

  useEffect(() => {
    const a =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user"))
        : { log: "Goust", pas: "1" };
    console.log(a);
    if (a != null) {
      addUOwnUser(a);
      console.log(OwnUsers);
    }
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
