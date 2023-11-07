import axios from "axios";
import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { getImg } from "../../Stuff/img/imgexport";
import CssHome from "./HomePage.module.css";

function HomePage() {
  const addPost = useStore((state) => state.addPost);
  const Posts = useStore((state) => state.Posts);
  const OwnUser = useStore((state) => state.OwnUser);

  useEffect(() => {
    axios.get("http://localhost:4000/api/post").then((data) => {
      addPost(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sortArr = [];

  Posts.forEach((arg) => {
    if (arg.log === OwnUser.log) {
      sortArr.push(arg);
    }
  });
  return (
    <div
      style={{ backgroundImage: `url(${getImg("/bg1.jpg")})` }}
      className={CssHome.wrap}>
      <div className={CssHome.content}>
        <div className={CssHome.name}>{OwnUser.log}</div>
        {sortArr.map((elem) => (
          <div className={CssHome.info} key={elem.id}>
            <div className={CssHome.post}>{elem.post}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
