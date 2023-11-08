import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/store";
import { getImg } from "../../Stuff/img/imgexport";
import { getTarUser } from "../../utils/utilsStore";
import FirsStr from "../FirsStr.module.css";
import SignCss from "./ProfileSign.module.css";

function ProfileSign(props) {
  const [NavBar, setNavBar] = useState(true);
  const OwnUser = useStore((state) => state.OwnUser);

  function handleNavBar() {
    setNavBar(!NavBar);
  }

  return (
    <div className={SignCss.user_cab}>
      {OwnUser.log === "" && OwnUser.log === "" ? (
        <div>
          <div>
            <Link
              onClick={handleNavBar}
              className={
                window.location.pathname === "/SignIn"
                  ? FirsStr.focus
                  : FirsStr.link
              }
              to={"/SignIn"}>
              Вход
            </Link>
          </div>
          <div>
            <Link
              onClick={handleNavBar}
              className={
                window.location.pathname === "/RegIn"
                  ? FirsStr.focus
                  : FirsStr.link
              }
              to={"/RegIn"}>
              Регистрация
            </Link>
          </div>
        </div>
      ) : (
        <div className={SignCss.name} onClick={handleNavBar}>
          <Link
            className={
              window.location.pathname === "/Profile"
                ? FirsStr.focus
                : FirsStr.link
            }
            to={"/Profile"}>
            Кабинет
          </Link>
          <img
            className={SignCss.img}
            width={30}
            height={30}
            src={getImg("")}
            alt="Foto"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileSign;
