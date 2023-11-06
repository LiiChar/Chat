import React, { useState } from "react";
import { Link } from "react-router-dom";
import FirsStr from "./FirsStr.module.css";
import { useStore } from "../store/store";
import ProfileSign from "./SidePage/ProfileSign";

function FIrsStr({ reset }) {
  const OwnUsers = useStore((state) => state.OwnUser);

  const [NavBar, setNavBar] = useState(true);

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
        Домой
      </Link>

      <Link
        onClick={handleNavBar}
        className={
          window.location.pathname === "/Post" ? FirsStr.focus : FirsStr.link
        }
        to={"/Post"}>
        Посты
      </Link>

      <ProfileSign reset={reset} OwnUser={OwnUsers} />
    </div>
  );
}

export default FIrsStr;
