import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckinCss from "./Checkin.module.css";
import { useStore } from "../../store/store";
import { getAllNameUser } from "../../utils/utilsStore";
import axios from "axios";
import { io } from "socket.io-client";
import Cheout from "./Cheout.module.css";

const socket = io("http://localhost:4000/");

function CheckIn() {
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);
  const addUOwnUser = useStore((state) => state.addUOwnUser);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/users");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function AddUserDB(user) {
    await axios.post("http://localhost:4000/api/users", user);
  }
  function handleInputName(e) {
    setUser(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleButton(e) {
    if (!getAllNameUser(users).includes(user)) {
      e.preventDefault();
      AddUserDB({
        id: `${user}-${password}`,
        log: user,
        Name: "",
        About: "",
        pas: password,
        img: "",
      });
      addUser([
        ...users,
        {
          id: `${user}-${password}`,
          log: user,
          Name: "",
          About: "",
          pas: password,
          img: "",
        },
      ]);
      setUser("");
      setPassword("");
      addUOwnUser({ log: user, pas: password });
      localStorage.setItem(
        "user",
        JSON.stringify({ log: user, pas: password })
      );
      navigate("/Home");
    } else {
      alert("Такое имя уже есть");
    }
  }

  return (
    <div className={Cheout.wrapper}>
      <div className={Cheout.modal}>
        <div className={Cheout.text}>
          <input
            className={Cheout.input}
            type="text"
            placeholder="Введите имя"
            value={user}
            onChange={handleInputName}
            required
          />
          <input
            className={Cheout.input}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handleInputPassword}
            required
          />

          <div className={Cheout.Navigate}>
            <button
              className={Cheout.buttoner}
              type="sumbit"
              onClick={handleButton}>
              Регистрация
            </button>
            <span>
              Есть аккаунта
              <Link className={Cheout.Link} to={"/SignIn"}>
                {" "}
                войди
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
