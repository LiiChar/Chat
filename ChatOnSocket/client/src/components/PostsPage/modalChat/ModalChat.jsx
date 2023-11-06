import React, { useState } from "react";
import style from "./Modal.module.css";

const ModalChat = ({ isVisible, onHandle, closeModal }) => {
  const [name, setName] = useState("");

  const handleButton = () => {
    onHandle(name);
    setName("");
  };

  const ClicContent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isVisible && (
        <div onClick={closeModal} className={style.wrapper}>
          <div onClick={ClicContent} className={style.content}>
            <input
              placeholder="Введите название чата"
              className={style.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <button onClick={handleButton}>Создать</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalChat;
