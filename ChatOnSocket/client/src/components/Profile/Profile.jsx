import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CssProfile from "./Profile.module.css";
import { getImg } from "../../Stuff/img/imgexport";
import { useStore } from "../../store/store";

function Profile() {
  const OwnUser = useStore((state) => state.OwnUser);
  const delOwnUser = useStore((state) => state.delOwnUser);
  const navigate = useNavigate();

  function handleExitAcc() {
    delOwnUser();
    localStorage.clear("user");
    navigate("/Home");
  }

  var sectionStyle = {
    backgroundImage: `url(${getImg("/bg1.jpg")})`,
  };

  return (
    <div style={sectionStyle} className={CssProfile.wrap}>
      <div className={CssProfile.content}>
        <div className={CssProfile.name}>
          <img
            onClick={() => {}}
            className={CssProfile.img}
            alt="foto"
            src={getImg("")}
            width="100"
            height={100}
          />
          {OwnUser.log}
        </div>
        <div className={CssProfile.info}>
          <div>NickName: {OwnUser.log}</div>
        </div>
        <button onClick={handleExitAcc}>Выйти из аккаунта</button>
      </div>
    </div>
  );
}

export default Profile;
