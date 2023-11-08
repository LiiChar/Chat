import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStore } from "../../store/store";
import Poster from "./PostPage.module.css";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { getImg } from "../../Stuff/img/imgexport";
import axios from "axios";
import ModalChat from "./modalChat/ModalChat";

const socket = io("http://localhost:4000/");

function PostsPage() {
  const user = useStore((state) => state.users);
  const addPost = useStore((state) => state.addPost);
  const PostsGet = useStore((state) => state.Posts);
  const OwnUser = useStore((state) => state.OwnUser);
  const addUser = useStore((state) => state.addUser);
  const postId = useStore((state) => state.id);
  const addId = useStore((state) => state.addId);
  const room = useStore((state) => state.room);
  const setMainRomm = useStore((state) => state.setRoom);
  const addRoom = useStore((state) => state.addRoom);

  const Posts = useMemo(() => {
    return PostsGet.filter((val) => val.room_id == room);
  }, [room, PostsGet]);

  let SortPost = [];
  let isFind = false;
  const [Post, setPost] = useState("");
  const [PostChange, setPostChange] = useState("");
  const [show, setShow] = useState(true);
  const [showChange, setShowChange] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", hanldeEnter);
    return () => {
      window.removeEventListener("keydown", hanldeEnter);
    };
  });

  useEffect(() => {
    const fetch = async () => {
      return (await axios.get("http://localhost:4000/api/room")).data;
    };
    fetch().then((data) => setRooms(data));
  }, []);

  useEffect(() => {
    let paramsString = document.location.search; // ?page=4&limit=10&sortby=desc
    let searchParams = new URLSearchParams(paramsString);
    socket.emit("addAllMessage", searchParams.get("to"));
  }, []);

  useEffect(() => {
    socket.on("addAllMessage", (Post) => {
      if (Post) {
        addPost(Post);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("addUser", (User) => {
      addUser(User);
    });
    socket.on("addChat", () => {
      const fetch = async () => {
        return (await axios.get("http://localhost:4000/api/room")).data;
      };
      fetch().then((data) => {
        setRooms(data);
      });
    });
    socket.on("deleteChat", () => {
      const fetch = async () => {
        return (await axios.get("http://localhost:4000/api/room")).data;
      };
      fetch().then((data) => {
        setRooms(data);
      });
    });
  }, []);

  function hanldeEnter(event, i) {
    let code = event.keyCode || event.which;
    if (code === 13 && Post) {
      //13 is the enter keycode
      handleSendPost();
    }
  }

  function handleVisbleModal() {
    setVisible(true);
  }

  async function handleCreateChat(name) {
    if (name.length > 3) {
      const chat_id = await axios.post("http://localhost:4000/api/room", {
        name,
        username: OwnUser.log,
      });
      addRoom();
      setRooms([...rooms, { id: chat_id, name: name }]);
      setMainRomm(chat_id);
      setVisible(false);
      socket.emit("addChat");
    } else {
      alert("Имя чата должно быть больше 3 символов");
    }
  }

  Posts.forEach((element) => {
    SortPost.push(element);
    isFind = true;
  });

  function HandleValue(e) {
    setPost(e.target.value);
  }

  function handleSendPost(e, i) {
    if (Post) {
      let paramsString = document.location.search; // ?page=4&limit=10&sortby=desc
      let searchParams = new URLSearchParams(paramsString);
      let id = uuidv4();
      socket.emit("addMessage", {
        message: { id: id, room_id: room, log: OwnUser.log, post: Post },
        id: searchParams.get("to"),
      });
      addPost([
        ...PostsGet,
        { id: id, room_id: room, log: OwnUser.log, post: Post },
      ]);
      setPost("");
    }
  }

  async function deletePost(e) {
    addId(e.target.attributes.post.value);
    showOptions(-1);
    socket.emit("deletePost", e.target.attributes.post.value);
  }

  function handleChangePost(e) {
    addId(e.target.attributes.post.value);
    setPostChange(
      SortPost.find((post) => post.id == e.target.attributes.post.value).post
    );
    setShowChange(true);
  }

  function deleteChat(id) {
    socket.emit("deleteChat", { id: id });
  }

  async function changePost() {
    setShowChange(false);
    setPostChange(Post);
    socket.emit("putPost", { id: postId, message: PostChange });
    showOptions(-1);
  }

  function showOptions(num) {
    setShowChange(false);
    setShow(num);
  }

  return (
    <div
      className={Poster.wrapper}
      onClick={() => showOptions(-1)}
      style={{
        backgroundImage: `url(${getImg("/bg1.jpg")})`,
        overflow: "hidden",
        backgroundSize: "100% 100%",
      }}>
      <div className={Poster.cont}>
        <ModalChat
          isVisible={visible}
          closeModal={() => setVisible(false)}
          onHandle={handleCreateChat}
        />
        <div className={Poster.users}>
          <div className={Poster.rooms}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid white",
                cursor: "pointer",
              }}
              onClick={handleVisbleModal}
              className={Poster.addRomms}>
              <div>Создать чат</div>
            </div>
            <div className={Poster.listRooms}>
              {rooms.map((ro) => (
                <div
                  style={{
                    backgroundColor:
                      room == ro.id ? "rgb(70, 70, 70)" : "inherit",
                  }}
                  key={ro.id}>
                  <div
                    className={Poster.link}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 5px",
                    }}
                    onClick={() => setMainRomm(ro.id)}>
                    <span style={{ cursor: "pointer" }}>{ro.name}</span>
                    {OwnUser.log === ro.author ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteChat(ro.id)}>
                        x
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {OwnUser.log === "" ? (
          <h1>Войдите</h1>
        ) : !isFind ? (
          <div className={Poster.box} onClick={(e) => e.stopPropagation()}>
            Постов нет
            <div className={Poster.Send}>
              <input
                autoFocus={true}
                className={Poster.InputSub}
                type={Poster.text}
                placeholder="Напишите что-нибудь"
                value={Post}
                onChange={HandleValue}
              />
              <button className={Poster.buttonSub} onClick={handleSendPost}>
                Написать
              </button>
            </div>
          </div>
        ) : (
          <div className={Poster.box}>
            {SortPost.map((arg) =>
              OwnUser.log === arg.log ? (
                <div className={Poster.OwnPost} key={arg.id}>
                  <div>
                    {OwnUser.log === arg.log ? (
                      <div
                        // shower={false}
                        post={arg.id}
                        className={Poster.show}
                        onClick={(e) => {
                          showOptions(arg.id);
                          e.stopPropagation();
                          if (show === arg.id) {
                            showOptions(-1);
                          }
                        }}>
                        :
                      </div>
                    ) : (
                      ""
                    )}
                    {show === arg.id ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={Poster.options}>
                        <span
                          style={{ cursor: "pointer" }}
                          post={arg.id}
                          onClick={deletePost}>
                          Удалить
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          post={arg.id}
                          onClick={handleChangePost}>
                          Изменить
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={Poster.info}>
                    <div className={Poster.infoArg}>
                      <div>{arg.log}</div>
                      <div className={Poster.posts}>{arg.post}</div>
                    </div>
                    <div>
                      <img
                        className={Poster.OwnImg}
                        src={getImg("/default.jpeg")}
                        alt="foto"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={Poster.post} key={arg.id}>
                  <div className={Poster.info}>
                    <div>
                      <img
                        className={Poster.img}
                        src={getImg("/default.jpeg")}
                        alt="foto"
                      />
                    </div>
                    <div className={Poster.infoArg}>
                      <div>{arg.log}</div>
                      <div className={Poster.posts}>{arg.post}</div>
                    </div>
                  </div>
                  <div>
                    {OwnUser.log === arg.log ? (
                      <div
                        // shower={false}
                        post={arg.id}
                        className={Poster.show}
                        onClick={(e) => {
                          showOptions(arg.id);
                          e.stopPropagation();
                          if (show === arg.id) {
                            showOptions(-1);
                          }
                        }}>
                        :
                      </div>
                    ) : (
                      ""
                    )}
                    {show === arg.id ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={Poster.options}>
                        <span
                          style={{ cursor: "pointer" }}
                          post={arg.id}
                          onClick={deletePost}>
                          Удалить
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          post={arg.id}
                          onClick={handleChangePost}>
                          Изменить
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )
            )}
            {showChange ? (
              <div
                style={{ color: "white" }}
                className={Poster.Send}
                onClick={(e) => e.stopPropagation()}>
                <input
                  autoFocus={true}
                  className={Poster.InputSub}
                  type={Poster.text}
                  placeholder="Напишите что-нибудь"
                  value={PostChange}
                  required
                  onChange={(e) => setPostChange(e.target.value)}
                />
                <button className={Poster.buttonSub} onClick={changePost}>
                  Изменить пост
                </button>
              </div>
            ) : (
              <div style={{ color: "white" }} className={Poster.Send}>
                <input
                  autoFocus={true}
                  className={Poster.InputSub}
                  type={Poster.text}
                  placeholder="Напишите что-нибудь"
                  value={Post}
                  required
                  onChange={HandleValue}
                  onClick={(e) => e.stopPropagation()}
                />
                <button className={Poster.buttonSub} onClick={handleSendPost}>
                  Написать
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
