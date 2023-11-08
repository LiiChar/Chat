import React, { useState, useContext /*useEffect*/ } from "react";
import Poster from "./PostPage.module.css";
import { useStore } from "../../store/store";
import { getImg } from "../../Stuff/img/imgexport";

function Posts({ reset, posts }) {
  const user = useStore((state) => state.user);
  const addPost = useStore((state) => state.addPost);
  const Posts = useStore((state) => state.Posts);
  const OwnUser = useStore((state) => state.OwnUser);
  let SortPost = posts;
  let [isAddPost, setAddPost] = useState(false);
  let [Post, setPost] = useState("");

  function HandleValue(e) {
    setPost(e.target.value);
  }

  function handleSendPost(e, i) {
    addPost({ id: i, log: OwnUser.log, post: Post });
    setPost("");
    setAddPost(false);
  }
  return (
    <div className={Poster.box}>
      {SortPost.map((arg) =>
        OwnUser.log === arg.log ? (
          <div className={Poster.OwnPost} key={arg.id}>
            <div className={Poster.info}>
              <div className={Poster.infoArg}>
                <div>{arg.log}</div>
                <div className={Poster.posts}>{arg.post}</div>
              </div>
              <div>
                <img
                  className={Poster.OwnImg}
                  src={getImg("/default.jpeg")}
                  alt="defaul"
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
                  alt="defaul"
                />
              </div>
              <div className={Poster.infoArg}>
                <div>{arg.log}</div>
                <div className={Poster.posts}>{arg.post}</div>
              </div>
            </div>
          </div>
        )
      )}
      <div className={Poster.Send}>
        <input
          className={Poster.InputSub}
          type={Poster.text}
          placeholder="Напишите что-нибудь"
          value={Post}
          onChange={HandleValue}
        />
        <button className={Poster.buttonSub} onClick={handleSendPost}>
          Добавить пост
        </button>
      </div>
    </div>
  );
}

export default Posts;
