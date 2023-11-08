import React, { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import CheckinCss from "./Checkin.module.css";
import { getAllNameUser, getAllPasswordUser } from "../../utils/utilsStore";
import axios from "axios";

function CheckIn() {
  const addUOwnUser = useStore((state) => state.addUOwnUser);
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleInputName(e) {
    setUser(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleButton(e) {
    console.log(user, "-", password);
    console.log(users);
    if (
      getAllNameUser(users).includes(user) &&
      getAllPasswordUser(users).includes(password)
    ) {
      e.preventDefault();
      setUser("");
      setPassword("");
      addUOwnUser({ log: user, pas: password });
      localStorage.setItem(
        "user",
        JSON.stringify({ log: user, pas: password })
      );
      navigate("/Home");
    } else {
      setUser("");
      setPassword("");
      alert("Введены неверные данные");
    }
  }

  return (
    <div className={CheckinCss.wrapper}>
      <div className={CheckinCss.modal}>
        <div className={CheckinCss.text}>
          <input
            className={CheckinCss.input}
            type="text"
            placeholder="Введите имя"
            value={user}
            onChange={handleInputName}
            required
          />

          <input
            className={CheckinCss.input}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handleInputPassword}
            required
          />

          <div className={CheckinCss.Navigate}>
            <button
              className={CheckinCss.buttoner}
              type="sumbit"
              onClick={handleButton}>
              Вход
            </button>
            <span>
              Нет аккаунта
              <Link className={CheckinCss.Link} to={"/RegIn"}>
                {" "}
                Регистрируйся
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
