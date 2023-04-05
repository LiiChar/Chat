import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import Poster from './PostPage.module.css'
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { getImg } from '../../Stuff/img/imgexport';
import axios from 'axios';

const socket = io('http://localhost:4000/')

function PostsPage() {

  const user = useStore((state) => state.users)
  const addPost = useStore((state) => state.addPost)
  const Posts = useStore((state) => state.Posts)
  const OwnUser = useStore((state) => state.OwnUser)
  const addUser = useStore((state) => state.addUser)
  const postId = useStore((state) => state.id)
  const addId = useStore((state) => state.addId)


  let SortPost = [];
  let isFind = false
  const [Post, setPost] = useState('')
  const [PostChange, setPostChange] = useState('')
  const [show, setShow] = useState(true)
  const [showChange, setShowChange] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', hanldeEnter)
    return () => {
      window.removeEventListener('keydown', hanldeEnter)
    }
  })

  useEffect(() => {
    let paramsString = document.location.search; // ?page=4&limit=10&sortby=desc  
    let searchParams = new URLSearchParams(paramsString);
    socket.emit('addAllMessage', searchParams.get('to'))
  }, [])

  useEffect(() => {
    socket.on('addAllMessage', (Post) => {
      if (Post) {
        addPost(Post)
      }
    })
  }, [])


  useEffect(() => {
    socket.on('addUser', (User) => {
      addUser(User)
    })
  }, [])


  function hanldeEnter(event, i) {
    let code = event.keyCode || event.which;
    if (code === 13 && Post) { //13 is the enter keycode
      handleSendPost()  
    }
  }

  Posts.forEach(element => {
    SortPost.push(element)
    isFind = true
  });

  function HandleValue(e) {
    setPost(e.target.value);
  };

  function handleSendPost(e, i) {
    if (Post) {
      let paramsString = document.location.search; // ?page=4&limit=10&sortby=desc  
      let searchParams = new URLSearchParams(paramsString);
      let id = uuidv4()
      socket.emit('addMessage', { message: { id: id, log: OwnUser.log, post: Post }, id: searchParams.get('to') })
      addPost(({ id: id, log: OwnUser.log, post: Post }));
      setPost('')
    }
  };

  async function deletePost(e) {
    addId(e.target.attributes.post.value)
    socket.emit('deletePost', e.target.attributes.post.value)
  }

  function handleChangePost(e) {
    addId(e.target.attributes.post.value)
    setShowChange(true)
    setPostChange('')
  }

  async function changePost() {
    setShowChange(false)
    socket.emit('putPost', { id: postId, message: PostChange })
  }

  function showOptions(e) {
      setShow(!show)
  }

  return (
    <div className={Poster.wrapper} style={{ backgroundImage: `url(${getImg("/bg1.jpg")})` }}>
      <div className={Poster.cont}>
        <div className={Poster.users}>
          {
            user.map((user) =>
              <div key={user.id}>
                <Link className={Poster.link} to={`/Post?to=${user.id}`}>
                  {user.log}
                </Link>
              </div>
            )
          }
        </div>
        {(OwnUser.log === '') ?
          <h1>Войдите</h1>
          :
          (!isFind)
            ?
            <div className={Poster.box}>
              Постов нет
              <div className={Poster.Send}>
                <input className={Poster.InputSub} type={Poster.text} placeholder='Напишите что-нибудь' value={Post} onChange={HandleValue} />
                <button className={Poster.buttonSub} onClick={handleSendPost}>Добавить пост</button>
              </div>
            </div>
            :
            <div className={Poster.box}>
              {SortPost.map((arg) =>
                (OwnUser.log === arg.log)
                  ?
                  <div className={Poster.OwnPost} key={arg.id}>
                    <div>
                      {show ?
                        <div>
                          <span post={arg.id} onClick={deletePost}>
                            Удалить
                          </span>
                          <span post={arg.id} onClick={handleChangePost} className={Poster.change}>
                            Изменить
                          </span>
                          <span shower={false} post={arg.id} className={Poster.show} onClick={showOptions}>
                            | <br /> __ Закрыть
                          </span>
                        </div>

                        :
                        <div shower={false} post={arg.id} className={Poster.show} onClick={showOptions}>
                          | <br /> |
                        </div>
                      }
                    </div>
                    <div className={Poster.info}>
                      <div className={Poster.infoArg}>
                        <div>{arg.log}</div>
                        <div className={Poster.posts}>{arg.post}</div>
                      </div>
                      <div>
                        <img className={Poster.OwnImg} src={getImg('/foto.jpg')} alt="foto" />
                      </div>
                    </div>
                  </div>
                  :
                  <div className={Poster.post} key={arg.id}>
                    <div className={Poster.info}>
                      <div ><img className={Poster.img} src={getImg('/foto.jpg')} alt="foto" /></div>
                      <div className={Poster.infoArg}>
                        <div>{arg.log}</div>
                        <div className={Poster.posts}>{arg.post}</div>
                      </div>
                    </div>

                    {show ?
                      <div>
                        <span post={arg.id} onClick={deletePost}>
                          Удалить
                        </span>
                        <span post={arg.id} onClick={handleChangePost} className={Poster.change}>
                          Изменить
                        </span>
                        <span post={arg.id} shower={false} className={Poster.show} onClick={showOptions}>
                          __ <br /> | Закрыть
                        </span>
                      </div>

                      :
                      <div shower={false} className={Poster.show} onClick={showOptions}>
                        | <br /> |
                      </div>
                    }

                  </div>


              )}
              {showChange ?
                <div className={Poster.Send}>
                  <input
                    className={Poster.InputSub}
                    type={Poster.text}
                    placeholder='Напишите что-нибудь'
                    value={PostChange}
                    required
                    onChange={(e) => setPostChange(e.target.value)} />
                  <button
                    className={Poster.buttonSub}
                    onClick={changePost}>
                    Изменить пост
                  </button>
                </div>
                :
                <div className={Poster.Send}>
                  <input
                    className={Poster.InputSub}
                    type={Poster.text}
                    placeholder='Напишите что-нибудь'
                    value={Post}
                    required
                    onChange={HandleValue} />
                  <button
                    className={Poster.buttonSub}
                    onClick={handleSendPost}>
                    Добавить пост
                  </button>
                </div>
              }

            </div>
        }
      </div>

    </div>
  )
}

export default PostsPage